import type { HttpResponse } from '@/utils/http'
import http from '@/utils/http'

export interface Token {
  token: string
}

export function loginRequest(account: string, password: string) {
  return http.request<HttpResponse<Token>>({
    url: '/user/user/login',
    method: 'post',
    enableLoading: true,
    loadingText: '登录中...',
    enableTip: true,
    data: {
      account,
      password
    }
  })
}

export interface IUserInfo {
  appId?: number
  avatar?: string
  channelId?: number
  createTime?: string
  introduction?: string
  merchantId?: number
  mobile?: string
  nickName?: string
  sex?: number
  status?: number
  updateTime?: string
  userId?: number
  userName?: string
  userType?: number
}

export function userInfoRequest() {
  return http.request<HttpResponse<IUserInfo>>({
    url: '/user/user',
    method: 'get'
  })
}
