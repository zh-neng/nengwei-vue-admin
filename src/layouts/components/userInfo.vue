<template>
  <el-dropdown
    class="h-full inline-flex items-center justify-center px-3"
    @command="clickDropdownMenuItem"
  >
    <div class="inline-flex cursor-pointer items-center justify-center">
      <el-avatar :size="25" :src="getAssetsFile('@/assets/img/avatar.jpeg')" class="mr-2" />
      <span>{{ userStore.userInfo?.nickName || "系统昵称" }}</span>
    </div>
    <template v-if="appConfig.needLogin" #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="SIGN_OUT">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { getAssetsFile } from '@/utils/importer'
import { resetRouter } from '@/plugins/route'

const router = useRouter()
const userStore = useUserStore()
const routeStore = useRouteStore()

function clickDropdownMenuItem(command: string) {
  if (command === 'SIGN_OUT') {
    userStore.clearToken()
    routeStore.resetRoute()
    resetRouter()
    router.push({ name: 'login' })
  }
}
</script>

<style>

</style>
