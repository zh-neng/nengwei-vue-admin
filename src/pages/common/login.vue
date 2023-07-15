<template>
  <div class="bg bg-no-repeat">
    <!-- Logo 和 Title -->
    <el-container
      class="m-4 mt-[2rem] w-full flex items-center justify-center transition-all"
    >
      <img
        :src="getAssetsFile('logo.png')"
        :alt="appConfig.title"
        srcset=""
        class="w-[41px]"
      >
      <span class="ml-1 text-2xl text-[#609479] dark:text-white">{{
        appConfig.title
      }}</span>
    </el-container>

    <!-- SVG -->
    <el-container
      class="absolute left-[10%] top-[50%] h-0 w-0 translate-y-[-50%] duration-500 ease-linear 2xl:h-[40rem] 2xl:w-[40rem] !transition-all"
    >
      1
    </el-container>

    <!-- 登录表单 -->
    <el-container
      direction="vertical"
      class="el-container login is-vertical absolute left-[50%] top-[50%] h-auto w-[32rem] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[1rem] p-[3rem] shadow-xl duration-500 ease-linear 2xl:left-[70%] 2xl:w-[38rem] xl:w-[40rem] !transition-all"
    >
      <h1 class="mb-[1.5rem] text-3xl font-bold font-serif">
        登录
      </h1>
      <el-form
        ref="loginFormRef"
        size="large"
        :model="loginModel"
        :rules="LoginRules"
        @keyup.enter="onHandleLogin(loginFormRef)"
      >
        <el-form-item prop="username">
          <el-input v-model="loginModel.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginModel.password"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="w-full"
            @click="onHandleLogin(loginFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="flex items-center justify-around">
        <div class="flex items-center justify-around">
          <el-icon @click="settingStore.toggleMode()">
            <i :class="settingStore.themeMode === 'dark' ? 'i-carbon-moon' : 'i-carbon-sun'" />
          </el-icon>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { getAssetsFile } from '@/utils/importer'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const settingStore = useSettingStore()

// 表单实例
const loginFormRef = ref<FormInstance>()

function enterDown(e: any) {
  if (e.code === 'Enter') {
    onHandleLogin(loginFormRef.value)
  }
}

onMounted(() => {
  window.addEventListener('keydown', enterDown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', enterDown)
})

// 登录校验表单
const loginModel = reactive({
  username: '',
  password: ''
})

// 登录校验规则
const LoginRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
})

// 处理登录逻辑
async function onHandleLogin(FormRef: FormInstance | undefined) {
  if (!FormRef) {
    return
  }
  await FormRef.validate(async (valid) => {
    if (valid) {
      // 校验成功 进行登录
      await userStore.login(loginModel.username, loginModel.password)
      router.push({ path: route.query.redirect?.toString() || '/' })
    }
  })
}
</script>

<style lang="scss" scoped>
* {
  transition: all 0s;
}
.bg {
  /* 加载背景图 */
  background: url("@/assets/img/login_bg.jpg");
  background-size: 100% 100%;

  -moz-background-size: 100% 100%; /* 老版本的 Firefox */

  background-repeat: no-repeat;
}
.login {
  background-color: rgba($color: #ffffff, $alpha: 0.6);
}

.dark {
  .login {
    background-color: rgba($color: #333333, $alpha: 0.6);
  }
    .bg {
    background: url("@/assets/img/login_bg_dark.jpg");
    background-size: 100% 100%;
    -moz-background-size: 100% 100%; /* 老版本的 Firefox */
    background-repeat: no-repeat;
  }
}
</style>

<route lang="yaml">
meta:
  route: false
  icon: 'ph:map-pin-line'
</route>
