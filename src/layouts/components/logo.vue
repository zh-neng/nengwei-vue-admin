<template>
  <div class="h-full w-full flex items-center justify-center">
    <img :src="getAssetsFile(appConfig.logo)" class="h-[2.5rem] w-[2.5rem]">
    <div :class=" settingStore.leftCollapsed && settingStore.layout === 'vertical' ? 'width-close' : 'width-open'" class="inline-block max-w-200px overflow-hidden whitespace-nowrap text-18px transition-width duration-1s">
      <div class="inline-block pl-6px">
        {{ appConfig.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAssetsFile } from '@/utils/importer'

const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.width-open {
  max-width: 300px;
  @apply transition-all duration-500 delay-300;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
}
.width-close {
  max-width: 0;
}
</style>
