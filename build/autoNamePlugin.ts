const fileRegex = /.(vue)$/

export default function vitePluginVueAutoName() {
  return {
    name: 'vite-plugin-vue-auto-name',

    transform(src: any, id: any) {
      let code = src

      if (fileRegex.test(id)) {
        let name = id.split('/').at(-1).split('.')[0]
        if (id.includes('src/pages')) {
          name = id.split('src/pages/')[1].split('.')[0].replaceAll('/', '-')
          code = code.replace(
            /const _sfc_main = \/\* @__PURE__ \*\/ _defineComponent\({/,
          `const _sfc_main = /* @__PURE__ */ _defineComponent({ name: "${name}",`)
          const regex = /const _sfc_main = {}/
          const matches = regex.exec(code)
          if (matches) {
            code = code.replace(regex, `const _sfc_main = { name: "${name}" }`)
          }
        }
      }

      if (id.includes('vue?vue')) {
        const name = id.split('/').at(-1).split('.')[0]
        if (id.includes('src/pages')) {
          const newName = id.split('src/pages/')[1].split('.')[0].replaceAll('/', '-')
          code = code.replace(
            /export default \/\* @__PURE__ \*\/ _defineComponent\({/,
            `export default /* @__PURE__ */ _defineComponent({ name: "${newName}",`)

          code = code.replace(
            `__name: "${name}"`,
           `__name: "${newName}"`)
          const regex = /const _sfc_main = {}/
          const matches = regex.exec(code)
          if (matches) {
            code = code.replace(regex, `const _sfc_main = { name: "${name}" }`)
          }
        }
      }

      return {
        code,
        map: null
      }
    }
  }
}
