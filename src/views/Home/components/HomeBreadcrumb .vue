<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.name"
        :to="{ path: item.path }"
      >
        {{ item.meta?.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

// 获取到当前路由（面包屑： 只需要获取当前的路由信息就可以了）
const route = useRoute();

// 计算属性： 当路由发生变化时，route.matched会重新计算
const breadcrumbs = computed(() => route.matched);
</script>

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
