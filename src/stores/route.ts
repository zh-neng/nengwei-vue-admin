import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

interface IRouteState {
  routeRecord: RouteRecordRaw[]
  tagViews: RouteLocationNormalizedLoaded[]
  keepAliveNames: string[]
  currentRouteName?: string
  routeLoaded: boolean
  refresh: boolean
}

export const useRouteStore = defineStore('routeStore', {
  state: (): IRouteState => ({
    routeRecord: [],
    tagViews: [],
    keepAliveNames: [],
    routeLoaded: false,
    refresh: false
  }),
  actions: {
    addKeepAlive(name: string) {
      this.keepAliveNames.push(name)
    },
    loadOver() {
      this.routeLoaded = true
    },
    resetRoute() {
      this.routeLoaded = false
      this.keepAliveNames = []
      this.routeRecord = []
      this.tagViews = []
    },
    removeKeepAlive(removeName: string) {
      for (let index = 0; index < this.keepAliveNames.length; index++) {
        if (this.keepAliveNames[index] === removeName) {
          this.tagViews.splice(index, 1)
          break
        }
      }
    },
    switchTagView(tagView: RouteLocationNormalizedLoaded) {
      this.currentRouteName = tagView.name as string
      for (const item of this.tagViews) {
        if (item.name === tagView.name) {
          return
        }
      }

      for (let index = 0; index < tagView.matched.length; index++) {
        const element = tagView.matched[index]
        if (!this.keepAliveNames.includes(element.name as string)) {
          this.keepAliveNames.push(element.name as string)
        }
      }
      this.tagViews.push(tagView)
    },
    flushPage(name: string) {
      this.currentRouteName = name as string
      const index = this.keepAliveNames.indexOf(name)
      this.keepAliveNames.splice(index, 1)
      setTimeout(() => {
        this.keepAliveNames.push(name)
      }, 100)
    },
    deleteTagVies(name: string) {
      const index = this.keepAliveNames.indexOf(name)
      this.keepAliveNames.splice(index, 1)
      for (let index = 0; index < this.tagViews.length; index++) {
        const element = this.tagViews[index]
        if (element.name === name) {
          this.tagViews.splice(index, 1)
        }
      }
    },
    addRoutes(router: RouteRecordRaw[]) {
      let aSortNo = 0
      let bSortNo = 0
      this.routeRecord.push(...router)
      this.routeRecord.sort((a, b) => {
        if (a.meta && a.meta.sortNo) {
          aSortNo = a.meta.sortNo as number
        }
        if (b.meta && b.meta.sortNo) {
          bSortNo = b.meta.sortNo as number
        }
        return bSortNo - aSortNo
      })
    }
  }
})
