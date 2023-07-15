<template>
  <div class="h-full w-full flex justify-end" style="display: flex;">
    <div :style="`width:${leftWidth}` " class="slow-open flex flex-col transition-width">
      <div :style="{ height: `${settingStore.topHeight}px` }" class="flex">
        <Logo />
      </div>
      <div class="flex-[1] overflow-x-hidden overflow-y-auto">
        <Menu />
      </div>
    </div>
    <!-- w-0是为了给一个宽度 如果不给会被撑开  宽度和flex同时存在的时候flex优先级高 -->
    <div class="w-0 flex flex-[1] flex-col border-1px border-#dfdfdf border-l-solid dark:border-#4c4d4f">
      <div :style="{ height: `${settingStore.topHeight}px` }" class="flex items-center border-1px border-#dfdfdf border-b-solid dark:border-#4c4d4f">
        <collapsed-icon />
        <bread-crumb class="flex-1" />
        <fullscreen />
        <setting />
        <user-info />
      </div>
      <main-contain class="flex-1 overflow-y-hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './components/menu/index.vue'
import Logo from './components/logo.vue'
import breadCrumb from './components/breadCrumb.vue'
import collapsedIcon from './components/collapsedIcon.vue'
import userInfo from './components/userInfo.vue'
import fullscreen from './components/fullscreen.vue'
import setting from './components/setting.vue'
import mainContain from '@/layouts/components/mainContain.vue'

const settingStore = useSettingStore()

const leftWidth = computed(() => settingStore.leftCollapsed ? '62px' : '240px')
</script>

<style lang="scss" scoped>
.slow-open{
  transition-duration: 0.3s;
}
</style>
