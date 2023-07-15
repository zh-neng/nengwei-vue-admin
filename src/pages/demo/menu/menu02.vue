<template>
  <div class="mt-6px bg-blue-2 p-10px">
    <div>
      多级菜单:二级菜单02
    </div>
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
  title: 多级菜单02
  sortNo: 4
  icon: i-carbon-user-avatar
</route>
