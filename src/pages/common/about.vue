<template>
  <div>
    <el-card class="box-card" header="" :body-style="{ fontSize: '15px' }" shadow="hover">
      <template #header>
        <span class="text-[1.2rem] font-medium">{{ appConfig.title }}后台管理系统 ✨✨✨</span>
      </template>
      <div>
        {{ appConfig.title }} 是一款基于Vue3 + TypeScript + ElementPlus
        等技术栈搭建的通用后台系统模板。结合了最新的前端技术栈，前后端权限控制、粒子化权限控制、自定义系统主题配置等多种功能🎉🎉🎉
      </div>
    </el-card>
    <el-card class="box-card" header="" :body-style="{ fontSize: '15px' }" shadow="hover">
      <template #header>
        <span class="text-[1.2rem] font-medium">生成环境依赖 🍞🍞🍞</span>
      </template>
      <el-descriptions :column="3" border size="large">
        <el-descriptions-item
          v-for="item in DependenciesArr"
          :key="item.name"
          label-align="center"
          align="center"
          width="150px"
        >
          <template #label>
            {{ item.name }}
          </template>
          {{ item.version }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card" header="" :body-style="{ fontSize: '15px' }" shadow="hover">
      <template #header>
        <span class="text-[1.2rem] font-medium">开发环境依赖 📦︎ 📦︎ 📦︎</span>
      </template>
      <el-descriptions :column="3" border size="large">
        <el-descriptions-item
          v-for="item in DevDependenciesArr"
          :key="item.name"
          label-align="center"
          align="center"
          width="150px"
        >
          <template #label>
            {{ item.name }}
          </template>
          {{ item.version }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import ProjectConfigJson from '../../../package.json'
import appConfig from '@/app.config'

interface PackJson {
  name: string
  version: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  [key: string]: any
}

interface PackItem {
  name: string
  version: string
}

const { dependencies, devDependencies } = ProjectConfigJson as PackJson

const DependenciesArr: PackItem[] = []
const DevDependenciesArr: PackItem[] = []

Object.keys(dependencies).forEach((key) => {
  const dependenciesObj: PackItem = { name: '', version: '' }
  dependenciesObj.name = key
  dependenciesObj.version = dependencies[key]
  DependenciesArr.push(dependenciesObj)
})

Object.keys(devDependencies).forEach((key) => {
  const dependenciesObj: PackItem = { name: '', version: '' }
  dependenciesObj.name = key
  dependenciesObj.version = devDependencies[key]
  DevDependenciesArr.push(dependenciesObj)
})
</script>

<style lang="scss" scoped>
  .box-card:not(:last-child) {
    margin-bottom: 1.5rem;
  }
</style>

<route lang="yaml">
meta:
  title: 关于系统
  icon: i-carbon-information
</route>
