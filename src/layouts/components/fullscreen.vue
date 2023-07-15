<template>
  <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏模式'">
    <i :class="isFullscreen ? 'i-system-windowscreen' : 'i-system-fullscreen' " class="i-system-collapsed ml-10px mr-20px" @click="toggle" />
  </el-tooltip>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>

</style>
