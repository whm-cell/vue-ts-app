<template>
  <div>
    <el-menu default-active="1">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-1">
          <span>item one</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <span>item two</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2-1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="2-1">
          <span>item one</span>
        </el-menu-item>
        <el-menu-item index="2-2">
          <span>item two</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
// 让菜单栏的顶到底部
.el-menu {
  height: calc(100vh - 60px);
  // border: none;
  padding-top: 30px;
}

// 选中后变色
.el-sub-item.is-active {
  background: #409eff;
  border-right: 3px solid #1890ff;
}
</style>
