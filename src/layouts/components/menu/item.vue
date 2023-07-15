<template>
  <!-- 单一菜单 -->
  <template v-if="(!route.children || route.children.length === 0)">
    <el-menu-item :index="route.name as string" @click="clickLinkMenuItem(route)">
      <el-icon style=" margin-right: 8px" size="25px">
        <i :class="route.meta?.icon" />
      </el-icon>
      <template #title>
        <span>{{ route.meta && route.meta.title ? route.meta.title : route.name }}</span>
      </template>
    </el-menu-item>
  </template>

  <template v-else-if="route.children.length === 1 && settingStore.simplifyMenu">
    <item :route="route.children[0]" />
  </template>

  <!-- 多菜单 -->
  <template v-else>
    <el-sub-menu :index="route.name as string">
      <template #title>
        <el-icon style="margin-right: 8px" size="25px">
          <i :class="route.meta?.icon" />
        </el-icon>

        <span>{{ route.meta && route.meta.title ? route.meta.title : route.name }}</span>
      </template>
      <template v-for="item in route.children" :key="item.name">
        <item :route="item" />
      </template>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

defineProps<{ route: RouteRecordRaw }>()
const router = useRouter()
const routerRoute = useRoute()
const settingStore = useSettingStore()

function clickLinkMenuItem(route: RouteRecordRaw) {
  if (route.name === routerRoute.name) {
    return
  }
  router.push({ name: route.name })
}
</script>

<style scoped>
/* .el-menu-item.is-active {
    background: var(--el-color-primary);
    color: #ffffff;
  } */
</style>
