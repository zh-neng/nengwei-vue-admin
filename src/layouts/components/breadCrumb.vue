<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in breadMenuData" :key="index">
      <div class="flex items-center">
        <i :class="item.meta?.icon" class="h-20px w-20px" />
        <span class="ml-[5px]"> {{ item.meta?.title }} </span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

const route = useRoute()
const routeStore = useRouteStore()
const settingStore = useSettingStore()
// 监听路由的变化，更改面包屑
const routeKey = ref(route.name as string)

const calculateRouteChain: (routes: RouteRecordRaw[]) => RouteRecordRaw[] = (routes) => {
  for (const item of routes) {
    if (routeKey.value === item.name) {
      return [item]
    } else if (item.children) {
      if (item.children.length > 1 || !settingStore.simplifyMenu) {
        const value = calculateRouteChain(item.children)
        if (value.length > 0) {
          value.unshift(item)
          return value
        }
      } else {
        const value = calculateRouteChain(item.children)
        if (value.length > 0) {
          return value
        }
      }
    }
  }
  return []
}

const breadMenuData = ref<RouteRecordRaw[]>([])
watchEffect(() => {
  routeKey.value = route.name as string
  breadMenuData.value = calculateRouteChain(routeStore.routeRecord)
})
</script>
