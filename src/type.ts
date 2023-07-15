import type { App } from 'vue'

export interface AppPlugin {
  sortNo?: number
  setup: (app: App) => void
}
