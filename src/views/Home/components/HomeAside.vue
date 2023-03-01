<template>
  <div>
    <el-menu :default-active="route.fullPath" router>
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
import { useRouter, useRoute } from "vue-router";

import { useStore } from "@/store";
import type { RouteRecordName } from "vue-router";

const store = useStore();

// 获取权限数组
const permission = store.state.users.infos.permission;

const router = useRouter();
const route = useRoute();
console.log(router.options.routes);
// 深拷贝，防止修改原数据
const menus = _.cloneDeep(router.options.routes).filter((item) => {
  item.children = item.children?.filter(
    (item) =>
      item.meta?.menu &&
      (permission as (RouteRecordName | undefined)[]).includes(item.name)
  );

  return (
    item.meta?.menu &&
    (permission as (RouteRecordName | undefined)[]).includes(item.name)
  );
});
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
