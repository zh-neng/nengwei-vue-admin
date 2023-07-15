import { createApp } from 'vue'
import App from './App.vue'
import type { AppPlugin } from './type'

const app = createApp(App)

// 对plugin排序后按顺序安装
const plugins = Object.values(import.meta.glob<{ default: AppPlugin }>('./plugins/*.ts', { eager: true }))
const hasSortNo = plugins.filter(item => item.default.sortNo)
const noSortNo = plugins.filter(item => !item.default.sortNo)
hasSortNo.sort((a, b) => (b.default.sortNo as number) - (a.default.sortNo as number))
hasSortNo.forEach(i => i.default.setup(app))
noSortNo.forEach(i => i.default.setup(app))

app.mount('#app')
