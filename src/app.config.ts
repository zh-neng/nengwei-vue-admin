interface AppConfig {
  title: string
  logo: string
  // 简化菜单 当菜单只有一个子菜单时 隐藏父菜单项
  showSetting: boolean
  needLogin: boolean
  // TODO 待完善
  whiteRouteName: string[]
}

const appConfig: AppConfig = {
  title: '能为管理系统',
  logo: '@/assets/img/logo.png',
  showSetting: true,
  needLogin: true,
  whiteRouteName: ['login']
}

export default appConfig
