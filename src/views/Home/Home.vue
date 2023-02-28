<template>
  <div>
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-container>
        <el-aside>
          <home-aside></home-aside>
        </el-aside>
        <el-main>
          <home-breadcrumb></home-breadcrumb>
          <home-main></home-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import HomeAside from "./components/HomeAside.vue";
import HomeHeader from "./components/HomeHeader.vue";
import HomeMain from "./components/HomeMain.vue";
import HomeBreadcrumb from "./components/HomeBreadcrumb .vue";
</script>

<style scoped lang="scss">
// 添加阴影
.el-header {
  box-shadow: 0 8px 24px -2px rgba(0 0 0 / 5%);
}
// 添加阴影

.el-aside {
  box-shadow: 2px 0 8px 0 rgba(0 0 0 / 5%);
}

.el-main {
  background: #f0f2f5;
  display: flex;
  // 上下的弹性布局
  flex-direction: column;
}
</style>
