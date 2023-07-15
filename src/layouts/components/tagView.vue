<template>
  <div class="m-tags-view">
    <div class="tags-view">
      <el-tabs
        v-model="currentTab"
        type="card"
        class="h-full"
        @tab-remove="moveTab"
        @tab-change="changeTab"
      >
        <el-tab-pane
          v-for="item of routeStore.tagViews"
          :key="item.name as string"
          :name="item.name as string"
          :closable="routeStore.tagViews.length > 1"
        >
          <template #label>
            {{ item.meta.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right-btn">
      <el-dropdown trigger="hover">
        <i class="i-carbon-grid text-20px" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="refresh">
              刷新当页
            </el-dropdown-item>
            <el-dropdown-item @click="closeCurrent">
              关闭当前
            </el-dropdown-item>
            <el-dropdown-item @click="closeOther">
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item @click="closeAll">
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const route = useRoute()
const router = useRouter()
const routeStore = useRouteStore()

const currentTab = ref<string>('')

watch(() => route.name, () => {
  addTags(route)
}, { immediate: true })

function addTags(route: RouteLocationNormalizedLoaded) {
  const { name } = route
  currentTab.value = name as string
  if (name === 'login') {
    return
  }
  if (name) {
    routeStore.switchTagView({ ...route })
  }
  return false
}
function changeTab(name: any) {
  if (name !== route.name) {
    router.push({ name })
  }
}
function moveTab(name: any) {
  if (routeStore.tagViews.length < 2) {
    return
  }
  if (route.name === name) {
    console.log(routeStore.tagViews)
    let targetRouteName = ''
    for (let index = 0; index < routeStore.tagViews.length; index++) {
      console.log(index)
      const element = routeStore.tagViews[index]

      if (element.name === name) {
        if (index > 0) {
          targetRouteName = routeStore.tagViews[index - 1].name as string
        } else {
          targetRouteName = routeStore.tagViews[index + 1].name as string
        }
        break
      }
    }
    router.push({ name: targetRouteName })
  }
  routeStore.deleteTagVies(name)
}

function refresh() {
  routeStore.flushPage(route.name as string)
}
function closeCurrent() {
  if (routeStore.tagViews.length > 1) {
    moveTab(route.name)
  } else {
    closeAll()
  }
}
function closeOther() {
  routeStore.tagViews.forEach((item) => {
    if (route.name !== item.name) {
      moveTab(item.name)
    }
  })
}
function closeAll() {
  router.push({ path: '/' }).then(() => {
    closeOther()
  })
}
</script>

<style lang="scss" scoped>
$primaryColor: #409eff;
.m-tags-view{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  .right-btn{
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
}

.tags-view{
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  height: 100%;
  .el-tabs--card :deep(.el-tabs__header){
    box-sizing: border-box;
    height: 100%;;
    padding: 0 10px;
    border: none;
    margin: 0;
    .el-tabs__nav-wrap{
      height: 100%;
      display: flex;
      align-items: center;
      .el-tabs__nav-scroll{
        height: 100%;
        .el-tabs__nav{
          height: 100%;
          .el-tabs__item{
            height: 100%;
          }
        }
      }
    }
  }
  :deep(.el-tabs){
    .el-tabs__nav {
      border: none;
    }
    .el-tabs__header .el-tabs__item {
      border: none;
      color: #cccccc;
    }
    .el-tabs__header .el-tabs__item.is-active {
      color: var(--el-color-primary);
      border-bottom:2px solid var(--el-color-primary);
    }
  }
}
</style>
