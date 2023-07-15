<template>
  <div class="h-200px flex flex-col">
    <div class="border-1px border-#dfdfdf border-b-solid dark:border-#4c4d4f">
      <tag-view :style="{ height: `${settingStore.tagViewHeight}px` }" />
    </div>
    <div class="flex-[1] overflow-y-scroll">
      <custom-alive />
    </div>
  </div>
</template>

<script setup lang="ts">
import tagView from './tagView.vue'
import customAlive from './customAlive.vue'

const settingStore = useSettingStore()

const routeStore = useRouteStore()
</script>

<style lang="scss" scoped>

</style>
