// index.ts
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig
  , AxiosRequestHeaders

  , AxiosResponse
  , CancelTokenSource
} from 'axios'
import axios, { AxiosHeaders } from 'axios'
import md5 from 'crypto-js/md5'

export interface RequestParams {
  [key: string]: any
}

export interface AxiosWraperRequestConfig<D = any> extends AxiosRequestConfig<D> {
  defaultParams?: RequestParams
  // 是否开启打印
  log?: boolean
  // 是否重复请求
  checkRepeatClick?: 'reject' | 'cancelAndRepeat'
  enableLoading?: boolean
  enableTip?: boolean
  tipsText?: string

  judgeAndShowTip?: (
    response: AxiosWraperResponse | undefined,
    error: AxiosWraperError | undefined
  ) => void
  loadingText?: string
  loadingInstance?: any
  openLoading?: (config: AxiosWraperRequestConfig) => any
  closeLoading?: (config: AxiosWraperRequestConfig) => void
}

export interface InternalAxiosWraperRequestConfig<D = any> extends AxiosWraperRequestConfig<D> {
  headers: AxiosRequestHeaders
}

export interface AxiosWraperResponse<T = any, D = any> extends AxiosResponse<T, D> {
  config: InternalAxiosWraperRequestConfig<D>
}

export interface AxiosWraperError<T = unknown, D = any> extends AxiosError<T, D> {
  config: InternalAxiosWraperRequestConfig<D>
}

function getMd5(config: AxiosWraperRequestConfig): string {
  return md5(
    `${config.url}&${config.method}&${JSON.stringify(
      config.data
    )}&${JSON.stringify(config.params)}`
  )
    .toString()
    .toUpperCase()
}

export class AxiosWraper {
  // axios 实例
  axiosInstance: AxiosInstance

  pendingMap: Map<string, CancelTokenSource> = new Map()

  // 基础配置，url和超时时间
  baseConfig: AxiosWraperRequestConfig = { baseURL: '/', timeout: 60000, headers: AxiosHeaders.from() }

  constructor(
    config: InternalAxiosWraperRequestConfig,
    requestInterceptor: (
      requestConfig: InternalAxiosWraperRequestConfig
    ) => InternalAxiosWraperRequestConfig,
    responseInterceptor: (response: AxiosWraperResponse) => AxiosWraperResponse
  ) {
    // 使用axios.create创建axios实例
    this.axiosInstance = axios.create(Object.assign(this.baseConfig, config))

    // 添加请求拦截器
    this.axiosInstance.interceptors.request.use((requestConfig) => {
      const configReq = requestConfig as InternalAxiosWraperRequestConfig

      if (configReq.log) {
        window.console.log(configReq)
      }

      // 根据重试key策略判断
      if (configReq.checkRepeatClick) {
        const md5Key = getMd5(configReq)
        const source = axios.CancelToken.source()
        configReq.cancelToken = source.token
        const cancelTokenSource = this.pendingMap.get(md5Key)
        if (cancelTokenSource == null) {
          this.pendingMap.set(md5Key, source)
        } else if (configReq.checkRepeatClick === 'reject') {
          source.cancel('新的请求被取消')
        } else {
          cancelTokenSource.cancel('原请求被取消，新请求开始')
          this.pendingMap.set(md5Key, source)
        }
      }

      if (configReq.openLoading && configReq.enableLoading) {
        configReq.loadingInstance = configReq.openLoading(configReq)
      }

      return requestInterceptor ? requestInterceptor(configReq) : configReq
    })

    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const configRes = response.config as AxiosWraperRequestConfig

        // 删除重试key
        if (!configRes.checkRepeatClick) {
          this.pendingMap.delete(getMd5(configRes))
        }

        if (configRes.log) {
          window.console.log(response)
        }

        if (configRes.closeLoading && configRes.enableLoading) {
          configRes.closeLoading(configRes)
        }

        if (configRes.enableTip && configRes.judgeAndShowTip) {
          configRes.judgeAndShowTip(response, undefined)
        }

        return responseInterceptor ? responseInterceptor(response) : response
      },
      (error: AxiosWraperError) => {
        const configRes = error.config
        if (configRes.closeLoading && configRes.enableLoading) {
          configRes.closeLoading(configRes)
        }

        if (configRes.enableTip && configRes.judgeAndShowTip) {
          configRes.judgeAndShowTip(undefined, error)
        }

        if (configRes.log) {
          window.console.log(error)
        }
      }
    )
  }

  // 定义请求方法
  public request<T>(config: AxiosWraperRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<T>>(config)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }
}
