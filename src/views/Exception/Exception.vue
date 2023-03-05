<template>
  <div class="exception-title">
    <el-button type="primary">异常处理</el-button>
    <el-space>
      <el-button type="primary" plain>{{ year }}年</el-button>
      <el-select size="small" v-model="month">
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
  </div>

  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if="false" description="暂无申请审批" />
      <el-timeline v-else>
        <el-timeline-item timestamp="旷工" placement="top">
          <el-card>
            <el-space>
              <!--  左右排列 -->
              <h4>已通过</h4>
              <p class="apply-info">申请日期：</p>
              <p class="apply-info">申请详情：暂无打卡记录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>

    <el-col :span="12">
      <el-empty v-if="false" description="暂无申请审批" />
      <el-timeline v-else>
        <el-timeline-item timestamp="事假" placement="top">
          <el-card>
            <!--  默认上下排列 -->
            <h4>已通过</h4>
            <p class="apply-info">申请日期：</p>
            <p class="apply-info">申请详情：暂无打卡记录</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = new Date();

const year = date.getFullYear();
// const month = computed(() => {
//   return date.getMonth() + 1;
// })

const month = ref(date.getMonth() + 1);
</script>

<style scoped lang="scss">
.exception-title {
  display: flex;
  // 端点对其
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.el-select {
  width: 80px;
}

.el-timeline {
  padding: 10px;
}

.apply-info {
  margin: 10px;
}
</style>
