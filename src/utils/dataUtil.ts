import type { Ref } from 'vue'
import type { HttpResponse, Page } from '@/utils/http'
import type GenerateForm from '@/components/form-design/generate/GenerateForm.vue'

export class DataState<T extends Record<string, any>> {
  showEdit = false
  editTitle = '新增'
  editModel = {} as T
  searchModel = {} as T
  data: T[] = []
  enablePage = true
  tablePage = { current: 1, size: 30, total: 0 }
  tableLoadding = false

  constructor(enablePage?: boolean) {
    if (enablePage !== undefined) {
      this.enablePage = enablePage
    }
  }
}

export class DataHelper<T extends Record<string, any>> {
  state: DataState<T>
  formRef: Ref<InstanceType<typeof GenerateForm>>
  tableRef: Ref
  api: (req: any) => Promise<HttpResponse<any>>
  constructor(api: (req: any) => Promise<HttpResponse<any>>, state?: DataState<T>, formRef?: Ref, tableRef?: Ref) {
    if (formRef == null) {
      this.formRef = ref()
    } else {
      this.formRef = formRef
    }
    if (tableRef == null) {
      this.tableRef = ref()
    } else {
      this.tableRef = tableRef
    }
    if (state === undefined) {
      this.state = reactive<DataState<T>>(new DataState<T>()) as any
    } else {
      this.state = state
    }
    this.api = api
  }

  public showAdd() {
    this.state.showEdit = true
    this.formRef.value?.resetFields()
  }

  public showEdit(element: T) {
    this.formRef.value?.resetFields()
    this.state.editModel = { ...element }
    this.state.showEdit = true
  }

  public setTableRef(formRef: Ref) {
    this.tableRef = formRef
  }

  public requestData() {
    this.state.tableLoadding = true
    let param = { ...this.state.searchModel }
    if (this.state.enablePage) {
      param = { ...this.state.tablePage, ...param }
    }
    this.api(param)
      .then((res) => {
        console.log(res)
        if (this.state.enablePage) {
          const data = res.data as Page<any>
          this.state.data = data.list
          this.state.tablePage.current = data.current
          this.state.tablePage.size = data.size
          this.state.tablePage.total = data.total
        } else {
          this.state.data = res.data
        }
      })
      .finally(() => {
        this.state.tableLoadding = false
      })
  }

  public async validateForm() {
    return await this.formRef.value?.validate()
  }

  public async getFormData() {
    if (typeof this.formRef.value?.getData === 'function') {
      return await this.formRef.value?.getData()
    } else {
      return new Promise<T>((resolve, reject) => {
        this.formRef.value
          ?.validate()
          .then(() => {
            reject(this.state.editModel)
          })
          .catch((reason: any) => {
            reject(reason)
          })
      })
    }
  }
}

export function requestData(api: (req: any) => Promise<HttpResponse<any>>,
  state: DataState<any>) {
  state.tableLoadding = true
  let param = { ...state.editModel }
  if (state.enablePage) {
    param = { ...state.tablePage, ...param }
  }
  api(param)
    .then((res) => {
      if (state.enablePage) {
        const data = res.data as Page<any>
        state.data = data.list
        state.tablePage.current = data.current
        state.tablePage.size = data.size
        state.tablePage.total = data.total
      } else {
        state.data = res.data
      }
    })
    .finally(() => {
      state.tableLoadding = false
    })
}
