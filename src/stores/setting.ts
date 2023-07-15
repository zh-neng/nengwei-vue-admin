import { defineStore } from 'pinia'
import { changePrimaryColor, themeModeHandler } from '@/utils/themeHandler'

interface IThemeState {
  themeMode: 'while' | 'dark'
  primaryColor: string
  layout: string
  simplifyMenu: boolean
  leftCollapsed: boolean
  tagViewHeight: number
  topHeight: number
  alive: boolean
}

export const themeColorArray = [
  '#409eff',
  '#039be5',
  '#e53935',
  '#d81b60',
  '#8e24aa',
  '#5e35b1',
  '#3949ab',
  '#1e88e5',
  '#00acc1',
  '#00897b',
  '#43a047',
  '#7cb342',
  '#c0ca33',
  '#fdd835',
  '#ffb300',
  '#fb8c00',
  '#f4511e',
  '#6d4c41',
  '#757575',
  '#546e7a'
]

export const useSettingStore = defineStore('settingStore', {
  state: (): IThemeState => ({
    themeMode: 'while',
    primaryColor: '#409eff',
    layout: 'vertical',
    simplifyMenu: true,
    leftCollapsed: false,
    topHeight: 60,
    tagViewHeight: 40,
    alive: true
  }),
  actions: {
    changeTopHeight(value: number) {
      this.topHeight = value
    },
    changeTagViewHeight(value: number) {
      this.tagViewHeight = value
    },
    changeLayout(layout: string) {
      this.layout = layout
    },

    toggleCollapsed() {
      this.leftCollapsed = !this.leftCollapsed
    },
    toggleAlive() {
      this.alive = !this.alive
    },
    toggleSimplifyMenu() {
      this.simplifyMenu = !this.simplifyMenu
    },
    toggleMode() {
      if (this.themeMode === 'while') {
        this.themeMode = 'dark'
      } else {
        this.themeMode = 'while'
      }
      themeModeHandler().toggleThemeMode(this.themeMode)
    },
    changePrimaryColor(color: string) {
      this.primaryColor = color
      changePrimaryColor(this.primaryColor)
    }
  },
  persist: true
})
