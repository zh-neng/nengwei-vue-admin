<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="settingStore.alive ? routeStore.keepAliveNames : []">
      <component :is="Component" v-if="routeStore.keepAliveNames.includes(route.name as string) && Component" :key="(Component.type as any).name" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
const routeStore = useRouteStore()
const settingStore = useSettingStore()
function log(com: any) {
  console.log(com)
}
</script>

<style lang="scss" scoped>

</style>
