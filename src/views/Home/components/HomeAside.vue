<template>
  <div>
    <el-menu default-active="1-1" router>
      <el-sub-menu v-for="item in menus" :key="item.path" :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta?.icon"></component></el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <el-menu-item
          v-for="itemChild in item.children"
          :key="itemChild.path"
          :index="item.path + itemChild.path"
        >
          <el-icon><component :is="itemChild.meta?.icon"></component></el-icon>
          <span>{{ itemChild.meta?.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { useRouter } from "vue-router";
const router = useRouter();
console.log(router.options.routes);
// 深拷贝，防止修改原数据
const menus = _.cloneDeep(router.options.routes).filter(
  (item) => item.meta?.menu
);
</script>

<style scoped lang="scss">
// 让菜单栏的顶到底部
.el-menu {
  height: calc(100vh - 60px);
  padding-top: 30px;
}

// 选中后变色
.el-sub-item.is-active {
  background: #409eff;
  border-right: 3px solid #1890ff;
}
</style>
