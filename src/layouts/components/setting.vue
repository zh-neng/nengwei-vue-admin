<template>
  <el-tooltip content="设置">
    <i class="i-system-collapsed i-system-setting ml-10px mr-20px" @click="state.showSetting = true" />
  </el-tooltip>
  <el-drawer
    v-model="state.showSetting"
    size="400px"
    direction="rtl"
    :show-close="false"
  >
    <template #header>
      <div class="text-center">
        <span class="text-[var(--el-text-color-primary)]">系统设置</span>
      </div>
    </template>
    <el-form label-width="100">
      <div class="switch mb-[1.2rem]">
        <el-divider>布局设置</el-divider>
        <div class="mb-20px flex items-center justify-around">
          <el-tooltip
            v-for="item in ayoutModeData"
            :key="item.code"
            effect="dark"
            placement="bottom"
            :content="item.label"
          >
            <div
              class="checkbox-shadow relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg bg-white dark:bg-[var(--el-bg-color-page)]"
              :class="
                item.code === settingStore.layout ? 'active-layout' : ''
              "
              @click="settingStore.changeLayout(item.code)"
            >
              <div class="absolute bg-[#273352]" :class="item.menuClass" />
              <div class="absolute bg-[#f0f2f5]" :class="item.mainClass" />
            </div>
          </el-tooltip>
        </div>
        <el-form-item label="顶栏高度">
          <div class="ml-20px">
            <el-input-number v-model="state.topHeight" :min="45" :max="70" @change="settingStore.changeTopHeight(state.topHeight)" />
          </div>
        </el-form-item>
        <el-form-item label="标签页高度">
          <div class="ml-20px">
            <el-input-number v-model="state.tagViewHeight" :min="30" :max="50" @change="settingStore.changeTagViewHeight(state.tagViewHeight)" />
          </div>
        </el-form-item>
      </div>

      <div class="switch mb-[1.2rem]">
        <el-divider>主题设置</el-divider>
        <el-form-item class="w-260px items-center" label="主题模式">
          <div class="ml-20px">
            <el-switch
              v-model="state.isDark"
              size="large"
              inline-prompt
              :width="50"
              :active-icon="render({ name: 'i-carbon-moon text-#fff' })"
              :inactive-icon="render({ name: 'i-carbon-sun text-#666' })"
              @change="settingStore.toggleMode()"
            />
          </div>
        </el-form-item>
        <el-form-item label="主题颜色">
          <div class="ml-20px">
            <el-color-picker
              v-model="settingStore.primaryColor"
              :predefine="themeColorArray"
              @change="settingStore.changePrimaryColor(settingStore.primaryColor)"
            />
          </div>
        </el-form-item>
      </div>
      <div class="switch mb-[1.2rem]">
        <el-divider>菜单设置</el-divider>
        <el-form-item class="w-260px items-center" label="简化菜单">
          <div class="ml-20px">
            <el-switch
              v-model="state.simplifyMenu"
              size="large"
              inline-prompt
              :width="50"
              @change="settingStore.toggleSimplifyMenu()"
            />
          </div>
        </el-form-item>
        <el-form-item class="w-260px items-center" label="标签页缓存">
          <div class="ml-20px">
            <el-switch
              v-model="state.alive"
              size="large"
              inline-prompt
              :width="50"
              @change="settingStore.toggleAlive()"
            />
          </div>
        </el-form-item>
      </div>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { render } from '@/utils/iconRender'

const routeStore = useRouteStore()
const settingStore = useSettingStore()

const state = reactive({
  showSetting: false,
  isDark: settingStore.themeMode === 'dark',
  simplifyMenu: settingStore.simplifyMenu,
  color: '#ffffff',
  topHeight: settingStore.topHeight,
  tagViewHeight: settingStore.tagViewHeight,
  alive: settingStore.alive
})

const ayoutModeData = [
  {
    label: '左侧菜单',
    code: 'vertical',
    menuClass: 'w-1/3 h-full',
    mainClass: 'w-2/3 h-3/4 right-0 bottom-0'
  },
  {
    label: '顶部菜单',
    code: 'horizontal',
    menuClass: 'w-full h-1/3',
    mainClass: 'w-full h-2/3 bottom-0'
  },
  {
    label: '顶部混合菜单',
    code: 'mix',
    menuClass: 'w-full h-1/3',
    mainClass: 'w-2/3 h-2/3 right-0 bottom-0'
  }
]
</script>

<style lang="scss" scoped>
.active-layout {
  border: 2px solid var(--el-color-primary-light-3);
}

:deep(.switch){
  font-size: 20px;
}
</style>
