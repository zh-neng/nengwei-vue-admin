<template>
  <div class="mt-6px bg-green-2 p-10px">
    <div>多级菜单:一级菜单内容，输入框用于检测keep-alive</div>
    <input class="mt-6px">
    <custom-alive />
  </div>
</template>

<script setup lang="ts">
import customAlive from '@/layouts/components/customAlive.vue'
</script>

<style scoped>
</style>

<route lang="yaml">
meta:
  title: 多级菜单
  icon: i-carbon-user-avatar
</route>
