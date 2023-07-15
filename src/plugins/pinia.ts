import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { AppPlugin } from '@/type'

const plugin: AppPlugin = {
  setup: (app: App) => {
    const pinia = createPinia()
    pinia.use(
      createPersistedState({
        storage: localStorage
      })
    )
    app.use(pinia)
  },
  sortNo: 999
}

export default plugin
