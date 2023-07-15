import http from '@/utils/http'
import type { HttpResponse, Page } from '@/utils/http'
import type { RequestParams } from '@/utils/http/axiosWraper'

export interface IRecordPat {
  patId: number
  platformId: number
  appId: number
  channelId: number
  recordId: number
  patName: string
  sex: number
  birthday: string
  age: number
  ageMonth: number
  nation: string
  newbornWeight: string
  newbornInWeight: number
  birthplace: string
  nativePlace: string
  idCardNo: string
  profession: string
  marriageType: number
  currentAddressArea: string
  currentAddress: string
  currentAddressPhone: string
  currentAddressPost: string
  accountAddress: string
  accountAddressPost: string
  workAddress: string
  workAddressPhone: string
  workAddressPost: string
  contactsName: string
  contactsRelation: string
  contactsAddress: string
  contactsMobile: string
  ext: string
}

export function recordPatPagRequest(data: RequestParams) {
  return http.request<HttpResponse<Page<IRecordPat>>>({
    url: '/business/record_pat/page',
    method: 'get',
    data
  })
}
