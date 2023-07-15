import { defineStore } from 'pinia'
import { type IUserInfo, loginRequest, userInfoRequest } from '@/apis/system'

interface IUserState {
  token?: string
  userInfo?: IUserInfo
}

export const useUserStore = defineStore('userStore', {
  state: (): IUserState => ({
    token: undefined,
    userInfo: undefined
  }),
  actions: {
    clearToken() {
      this.token = undefined
    },
    async login(account: string, password: string) {
      const res = await loginRequest(account, password)
      this.token = res.data.token
    },

    async getUserInfo() {
      const res = await userInfoRequest()
      this.userInfo = res.data
    }

  },
  persist: true
})
