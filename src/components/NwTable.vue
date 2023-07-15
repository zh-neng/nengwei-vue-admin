<template>
  <div>
    <slot name="table-searchs" />
    <!-- 相关按钮模块 -->
    <slot name="table-buttons" />
    <el-table class="w-full" v-bind="prop" :data="data">
      <el-table-column
        v-for="(item, index) in tableHeaders"
        :key="index"
        :show-overflow-tooltip="true"
        :sortable="item.sortable"
        :fixed="item.fixed"
        :prop="item.prop"
        :label="item.title"
        :width="item.width"
        :min-width="item.minWidth"
      >
        <template v-if="judgeSlot(item.prop)" #default="scope">
          <slot :name="item.prop" :content="scope.row" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模块 -->
    <el-pagination
      v-if="pageMode !== 'none'"
      v-model:current-page="pageNumberWraper"
      v-model:page-size="pageSizeWraper"
      style="margin-top: 20px"
      background
      :layout="layout"
      :total="totalCount ? totalCount : prop.data.length"
      @current-change="changePageNumber"
      @size-change="changePageSize"
    />
  </div>
</template>

<script setup="{slots}" lang="ts">
import { type TableProps } from 'element-plus'

export interface NwTableProps<T> extends TableProps<T> {
  tableHeaders: NwTableHeader[]
  pageMode?: 'server' | 'client' | 'none'
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  layout?: string
}

const prop = withDefaults(defineProps<NwTableProps<unknown>>(), {
  showHeader: true,
  pageMode: 'server',
  fit: true,
  layout: 'total , prev, pager, next, jumper, sizes'
})
const emits = defineEmits(['update:pageSize', 'update:pageNumber', 'changePageNumber', 'changePageSize'])

let pageSizeWraper: Ref<number>

let pageNumberWraper: Ref<number>
if (prop.size === undefined) {
  pageSizeWraper = ref(20)
} else {
  pageSizeWraper = useVModel(prop, 'pageSize', emits) as any
}

if (prop.size === undefined) {
  pageNumberWraper = ref(1)
} else {
  pageNumberWraper = useVModel(prop, 'pageNumber', emits) as any
}

const data = computed(() => {
  if (prop.pageMode !== 'client') {
    return prop.data
  } else {
    const start = (pageNumberWraper.value - 1) * pageSizeWraper.value
    const tmpData: unknown[] = []
    for (let index: number = start; index < prop.data.length && index < start + pageSizeWraper.value; index++) {
      tmpData.push(prop.data[index])
    }
    return tmpData
  }
})

export interface NwTableHeader {
  title: string
  prop: string
  width?: number | string
  minWidth?: number | string
  fixed?: 'left' | 'right' | 'none'
  sortable?: boolean
}

const slot = useSlots()
const attr = useAttrs()
function changePageNumber(pageNumber: number) {
  pageNumberWraper.value = pageNumber
  emits('changePageNumber', pageNumberWraper.value)
}

function changePageSize() {
  console.log(222)
  emits('changePageSize', pageSizeWraper.value)
}

const judgeSlot = (prop: string) => slot[prop] !== undefined
</script>

<style lang="scss" scoped>

</style>
