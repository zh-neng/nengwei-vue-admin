<template>
  <keep-alive v-if="routeStore.routeLoaded">
    <Component :is="layout" class="h-full" />
  </keep-alive>
</template>

<script setup lang="ts">
const settingStore = useSettingStore()
const routeStore = useRouteStore()
const viteComponents = import.meta.glob('./*.vue', { eager: true })
const layout = computed(() => (viteComponents[`./${settingStore.layout}.vue`] as any).default)
</script>

<style scoped>

</style>
