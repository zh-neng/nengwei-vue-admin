// test.ts

import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/user/user/login',
    method: 'post',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          token: 'token'
        }
      }
    }
  }, {
    url: '/mock/user/user',
    method: 'get',
    response: ({ headers }: any) => {
      if (headers.token === 'token') {
        return {
          code: 0,
          data: {
            appId: 1,
            avatar: '',
            channelId: 1,
            createTime: '2022-09-09 06:08:28',
            introduction: '',
            merchantId: 1,
            mobile: '17554088888',
            nickName: '吉吉国王',
            sex: 1,
            status: 1,
            updateTime: '2022-09-09 06:08:28',
            userId: 1,
            userName: '李四[超]',
            userType: 0
          },
          msg: '请求成功。'
        }
      }
      return {
        code: 500,
        msg: '操作失败',
        data: ''
      }
    }
  }
] as MockMethod[]
