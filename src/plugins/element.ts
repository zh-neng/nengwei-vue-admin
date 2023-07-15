import type { App } from 'vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
import ElementPlus from 'element-plus'
import type { AppPlugin } from '@/type'

const plugin: AppPlugin = {
  setup: (app: App) => {
    app.use(ElementPlus, { locale })
  },
  sortNo: 998
}

export default plugin
