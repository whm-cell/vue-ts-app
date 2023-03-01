<template>
  <div>
    <el-descriptions border direction="vertical" :column="9">
      <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
      <el-descriptions-item label="正常出勤">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="操作">
        <el-button type="primary" plain size="small"> 查看详情</el-button>
      </el-descriptions-item>
      <el-descriptions-item label="考勤状态">
        <el-tag type="danger" size="small"> 异常</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <el-calendar v-model="value">
      <template #header>
        <el-button type="primary" size="small">在线签到</el-button>
        <el-space>
          <el-button plain>2022年</el-button>
          <el-select v-model="month" size="small">
            <el-option
              v-for="item in 12"
              :key="item"
              :value="item"
              :label="item + '月'"
            >
              {{ item }}月
            </el-option>
          </el-select>
        </el-space>
      </template>
    </el-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

/*  v-model 必须接响应式数据，比如由ref修饰的数据 */
const value = ref(new Date());

// 获取年和月
const year = value.value.getFullYear();
const month = ref(value.value.getMonth() + 1);
</script>

<style scoped lang="scss">
.el-descriptions {
  margin: 10px;
}
.el-select {
  width: 80px;
}
</style>
