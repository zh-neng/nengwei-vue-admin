<template>
  <i :class="settingStore.leftCollapsed ? 'i-system-expand' : 'i-system-collapsed'" class="ml-10px mr-20px" @click="settingStore.toggleCollapsed()" />
</template>

<script setup lang="ts">
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>

</style>
