import { useDark, useToggle } from '@vueuse/core'

/**
 * 切换系统主题模式钩子函数
 * @returns {IsDark, ToggleThemeMode}
 * judgeIsDarkMode：判断当前系统主题模式是否为暗黑模式
 * toggleThemeMode：切换系统主题模式
 */
function themeModeHandler() {
  const darkMode = useDark()
  const toggleDark = useToggle(darkMode)

  // 判断当前系统主题模式是否为暗黑模式
  const judgeIsDarkMode = () => {
    return darkMode.value
  }

  // 切换系统主题模式
  const toggleThemeMode = (mode: 'while' | 'dark') => {
    toggleDark(mode === 'dark')
  }
  return { judgeIsDarkMode, toggleThemeMode }
}
function changePrimaryColor(color: string) {
  document.documentElement.style.setProperty(
    '--el-color-primary',
    color
  )
}

export { themeModeHandler, changePrimaryColor }
