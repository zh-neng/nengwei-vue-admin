import { ElLoading, ElMessage } from 'element-plus'
import { AxiosHeaders } from 'axios'
import { getQueryString } from '../stringUtil'
import type {
  AxiosWraperResponse
  , InternalAxiosWraperRequestConfig
} from '@/utils/http/axiosWraper'
import {
  AxiosWraper
} from '@/utils/http/axiosWraper'

export interface HttpResponse<T> {
  code: number | string
  msg: string
  data: T
}

export interface Page<T> {
  current: number
  size: number
  total: number
  list: T[]
}

export function toRawType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

function clearEmptyParam(config: any) {
  ['data', 'params'].forEach((item) => {
    if (config[item]) {
      const keys = Object.keys(config[item])
      if (keys.length) {
        keys.forEach((key) => {
          const rawType = toRawType(config[item])
          if ([undefined, null].includes(config[item][key])
            && ['Object'].includes(rawType)) {
            delete config[item][key]
          }
        })
      }
    }
  })
}

function requestInterceptor(requestConfig: InternalAxiosWraperRequestConfig): InternalAxiosWraperRequestConfig {
  if (!(requestConfig.url?.indexOf('http') === 0)) {
    const userStore = useUserStore()
    if (userStore.token !== '') {
      if (requestConfig.headers) {
        requestConfig.headers.token = userStore.token
      } else {
        requestConfig.headers = AxiosHeaders.from({ token: userStore.token as string })
      }
    }
  }
  if (requestConfig.headers && !requestConfig.headers['Content-Type']) {
    requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  clearEmptyParam(requestConfig)
  // 处理get请求
  if (requestConfig.method === 'get' && requestConfig.data) {
    requestConfig.params = { ...requestConfig.data }
    requestConfig.data = undefined
  }

  if (
    requestConfig.headers
    && requestConfig.headers['Content-Type']
      === 'application/x-www-form-urlencoded'
    && requestConfig.data
  ) {
    requestConfig.data = getQueryString(requestConfig.data)
  }

  return requestConfig
}

function responseInterceptor(response: AxiosWraperResponse): AxiosWraperResponse {
  return response
}

const axiosConfig: InternalAxiosWraperRequestConfig = {
  headers: AxiosHeaders.from(),
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  enableTip: true,
  openLoading: (config) => {
    return ElLoading.service({
      lock: true,
      text: config.loadingText || '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  closeLoading: (config) => {
    config.loadingInstance?.close()
  },
  judgeAndShowTip: (response, error) => {
    if (response) {
      const data = response.data as HttpResponse<any>
      if (data.code !== 0 && data.code !== '0') {
        const tips = response.config.tipsText
          ? response.config.tipsText
          : data.msg
        ElMessage({
          message: tips,
          grouping: true,
          type: 'error'
        })
        if (data.code === 401) {
          const userStore = useUserStore()
          userStore.clearToken()
        }
      }
    } else if (error) {
      const tips = error.config.tipsText
        ? error.config.tipsText
        : error?.message
      ElMessage({
        message: tips,
        grouping: true,
        type: 'error'
      })
    }
  }
}

export default new AxiosWraper(
  axiosConfig,
  requestInterceptor,
  responseInterceptor
)
