import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
import vitePluginAutoName from './build/autoNamePlugin'
import appConfig from './src/app.config'

// https://vitejs.dev/config/
function config({ mode }) {
  console.log('当前运行模式', mode)
  const manualChunksLib = [
    ['mock'],
    ['element-plus'],
    ['@wangeditor'],
    ['xlsx'],
    ['echarts'],
    ['md-editor-v3', 'vue3-video-play']
  ]
  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    },
    build: {
      chunkSizeWarningLimit: 500,
      minify: 'terser',
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      terserOptions: {
        compress: {
          // warnings: false,
          drop_console: true, // 打包时删除console
          drop_debugger: true // 打包时删除 debugger
        },
        format: {
          // 去掉注释内容
          comments: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id: any, { getModuleInfo }) {
            for (let i = 0; i < manualChunksLib.length; i++) {
              const current: string[] = manualChunksLib[i]
              for (let j = 0; j < current.length; j++) {
                if (id.includes(current[j])) {
                  return `vendor${i}`
                }
              }
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
            const moduleInfo = getModuleInfo(id)
            if (moduleInfo
              // 分manifest包，解决chunk碎片问题
              && moduleInfo.importers.length
              + moduleInfo.dynamicImporters.length
              > 1
              && id.includes('src')
            ) {
              return 'manifest'
            }
            return undefined
          }
        }
      }
    },

    server: {
      cors: true,
      port: 3888,
      host: '0.0.0.0',
      hmr: true
    // proxy: {
    //   '/dev': {
    //     target: 'http://127.0.0.1:8086',
    //     // target: 'https://xzzy.iya365.com/admin/api',
    //     changeOrigin: true,
    //     rewrite: (path: string) => path.replace(/^\/dev/, '')
    //   }
    // }
    },
    plugins: [
      vue(),
      VueDevTools(),
      createHtmlPlugin({
        minify: true,
        pages: [
          {
            filename: 'index.html',
            template: 'index.html',
            injectOptions: {
              data: {
                title: appConfig.title,
                logo: appConfig.logo.replace('@', '/src')
              }
            }
          }
        ]
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: mode === 'dev',
        watchFiles: true,
        logger: true
      }),
      Unocss(),
      Pages({
        importMode: 'async',
        extensions: ['vue', 'md']
      }),
      vitePluginAutoName(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          { '@/app.config': [['default', 'appConfig']] }
        ],
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json' // Default `./.eslintrc-auto-import.json`
        },
        vueTemplate: true,
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores'
        ]
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
      // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts'
      })
    ]
  })
}
export default config
