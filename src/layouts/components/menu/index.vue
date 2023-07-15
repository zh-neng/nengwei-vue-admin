<template>
  <!-- background-color="rgb(0, 20, 40)" -->
  <!-- text-color="#fff" -->
  <div class="h-full">
    <el-menu
      :mode="mode"
      :class="{ 'h-full flex justify-center': mode === 'horizontal' }"
      :default-active="routerKey"
      :collapse="mode === 'vertical' && leftCollapsed"
      :collapse-transition="false"
    >
      <template v-for="item in routeStore.routeRecord" :key="item.name">
        <Item :route="item" />
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import Item from './item.vue'

withDefaults(defineProps<MenuProps>(), {
  mode: 'vertical'
})
const route = useRoute()
const routeStore = useRouteStore()
const settingStore = useSettingStore()
const leftCollapsed = ref<boolean>(settingStore.leftCollapsed)

let timer: any = 0

watch(() => settingStore.leftCollapsed, (newVal) => {
  if (timer) {
    clearTimeout(timer)
  }
  if (newVal) {
    leftCollapsed.value = newVal
  } else {
    timer = setTimeout(() => {
      leftCollapsed.value = newVal
      timer = 0
    }, 300)
  }
})

interface MenuProps {
  mode?: 'vertical' | 'horizontal'
}

const routerKey = ref<string>('')

watchEffect(() => {
  const pageTitle = `${route.meta.title} -  ${appConfig.title}` || appConfig.title
  document.getElementsByTagName('title')[0].innerHTML = `${pageTitle}`
  routerKey.value = route.name as string
})
</script>

<style scoped lang="scss">
:deep(.el-menu){
    border:none
}
:deep(.el-menu--horizontal){
  border-bottom: none;
}
</style>
