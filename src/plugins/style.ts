import type { AppPlugin } from '@/type'

import '@unocss/reset/normalize.css'
import '@/styles/app.scss'
import 'uno.css'

// ElementPlus 样式文件
import 'element-plus/dist/index.css'
import { changePrimaryColor, themeModeHandler } from '@/utils/themeHandler'

const plugin: AppPlugin = {
  setup: () => {
    const settingStore = useSettingStore()
    themeModeHandler().toggleThemeMode(settingStore.themeMode)
    changePrimaryColor(settingStore.primaryColor)
  }

}

export default plugin
