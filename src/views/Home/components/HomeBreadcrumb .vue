<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">安保处</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
// 面包屑样式
.el-breadcrumb {
  background: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 30px;
}
</style>
