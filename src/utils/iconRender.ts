/**
 * h() 渲染Iconify组件函数
 */

import { h } from 'vue'

export function render(
  props: {
    name: string
    width?: string | number
    height?: string | number
    color?: string
    isInline?: boolean
  } = { name: '', height: 100, width: 100, isInline: true }
) {
  return h('i', {
    icon: props.name,
    width: props.width,
    height: props.height,
    color: props.color,
    inline: props.isInline,
    class: props.name
  })
}
