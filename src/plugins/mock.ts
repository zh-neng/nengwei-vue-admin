import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import type { AppPlugin } from '@/type'

const plugin: AppPlugin = {
  setup: () => {
    if (import.meta.env.MODE === 'prod') {
      const modules: Record<string, any> = import.meta.glob('/mock/**/*.ts', {
        import: 'default',
        eager: true
      })

      const mockModules = Object.keys(modules).reduce((pre, key) => {
        if (!key.includes('/_')) {
          pre.push(...modules[key])
        }
        return pre
      }, [] as any[])
      createProdMockServer(mockModules)
    }
  }

}

export default plugin
