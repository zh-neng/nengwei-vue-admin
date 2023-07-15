import type { App } from 'vue'
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import { cloneDeep } from 'lodash-es'
import generatedRoutes from '~pages'
import type { AppPlugin } from '@/type'

/**
 * auther neng
 */

NProgress.configure({ easing: 'ease', speed: 500 })

const initRoutes: RouteRecordRaw[] = [{
  path: '/login',
  name: 'login',
  component: () => import('@/pages/common/login.vue'),
  meta: {
    label: '登录页面',
    isShow: false
  }
}, {
  path: '/404',
  name: '404',
  component: () => import('@/pages/common/404.vue'),
  meta: {
    isShow: false
  }
}]

/**
 * 路由实例
 */
const routerInstance = createRouter({
  history: createWebHashHistory(),
  routes: initRoutes
})

/**
 * 过滤路由
 * @param routes 
 * @param fristLevel 
 */
function filterRoutes(routes: RouteRecordRaw[], fristLevel = true) {
  const deleteIndexs: number[] = []
  for (let index = 0; index < routes.length; index++) {
    const element = routes[index]
    if (element.meta && element.meta.route === false) {
      deleteIndexs.unshift(index)
    } else if (element.children) {
      filterRoutes(element.children, false)
    }
  }
  deleteIndexs.forEach(item => routes.splice(item, 1)) 
}

/**
 * 添加重定向 重定向到第一个子路由
 * @param route 
 * @param base 
 */
function addRedirect(route: RouteRecordRaw, base: string) {
  if (route.children) {
    route.redirect = `${base}/${route.children[0].path}`
    route.children.forEach((element) => {
      addRedirect(element, `${base}/${element.path}`)
    })
  }
}

/**
 * 重置路由(用于登出删除登录添加的路由)
 */
function resetRouter() {
  const routesCopy = cloneDeep(generatedRoutes)
  filterRoutes(routesCopy)
  generatedRoutes.forEach((route) => {
    const tmpRoute = { ...route }
    if (tmpRoute.children) {
      routerInstance.removeRoute(route.name as string)
    }
  })
  routerInstance.removeRoute('all')
  routerInstance.removeRoute('root')
}

async function routeGuardHandle(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const routeStore = useRouteStore()
  const userStore = useUserStore()
  if (userStore.token || !appConfig.needLogin) {
    if (!routeStore.routeLoaded) {
      if (appConfig.needLogin) {
        await userStore.getUserInfo()
      }
      const routesCopy = cloneDeep(generatedRoutes)
      filterRoutes(routesCopy)
      const rootChildren: RouteRecordRaw[] = []
      routesCopy.forEach((route: RouteRecordRaw) => {
        const tmpRoute = { ...route }
        if (!tmpRoute.children) {
          rootChildren.push(tmpRoute)
        } else {
          addRedirect(tmpRoute, tmpRoute.path)
          tmpRoute.component = () => import('@/layouts/index.vue')
          routerInstance.addRoute(tmpRoute)
        }
      })
      routerInstance.addRoute({
        path: '/',
        name: 'root',
        component: () => import('@/layouts/index.vue'),
        redirect: `${routesCopy[0].path}`,
        children: rootChildren,
        meta: {
          isShow: false
        }
      })
      routerInstance.addRoute({
        path: '/:catchAll(.*)',
        name: 'all',
        redirect: '/404',
        meta: {
          isShow: false
        }
      })
      const routeStore = useRouteStore()
      routeStore.addRoutes(routesCopy)
      routeStore.loadOver()
      if (from.name === 'login' && to.name !== 'LoginIndex') {
        console.log('第一次登录跳转', from, to)
        next({ path: to.fullPath, replace: true })
      } else {
        console.log('刷新页面', from, to)
        next({ path: to.fullPath })
      }
    } else {
      if (to.name === 'login') {
        next({ path: to.query.redirect?.toString() || '/' })
      } else {
        next()
      }
    }
  } else {
    // 2. 没有Token
    // 2.1 检查是否配置了白名单
    const isAccess = appConfig.whiteRouteName.includes(to.name as string)
    // 2.2 如果跳转的页面是配置了白名单的，则放行，否则强制跳转登录页面
    isAccess ? next() : next(`/login?redirect=${to.path}`)
  }
}

/**
 * 全局路由守卫
 */
routerInstance.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 全局路由守卫处理
  await routeGuardHandle(to, from, next)
})

routerInstance.afterEach(async () => {
  // 进度条结束
  NProgress.done()
})

const plugin: AppPlugin = {
  setup: (app: App) => {
    app.use(routerInstance)
    const routeStore = useRouteStore()
  },
  sortNo: 100
}

export { routerInstance, resetRouter }
export default plugin
