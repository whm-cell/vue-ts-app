<template>
  <div class="apply-title">
    <el-button type="primary" @click="handleClick">添加审批</el-button>
    <el-space>
      <el-input v-model="search" placeholder="请输入内容" clearable />
      <el-button type="primary" icon="search" @click="handleSearch"
        >搜索</el-button
      >
      <el-devider direction="vertical"> </el-devider>
      <el-radio-group v-model="approverType" @change="handleStatus">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="1">待审批</el-radio-button>
        <el-radio-button label="2">已审批</el-radio-button>
        <el-radio-button label="3">已驳回</el-radio-button>
      </el-radio-group>
    </el-space>
  </div>
  <dev class="apply-table">
    <el-table border :data="applyList" style="width: 100%">
      <el-table-column prop="applicatname" label="申请人" width="180" />
      <el-table-column prop="reson" label="审批事由" width="180" />
      <el-table-column prop="time" label="时间" />
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="approvername" label="审批人" width="180" />
      <el-table-column prop="state" label="状态" width="180" />
    </el-table>
  </dev>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store";

const store = useStore();

const applyList = computed(() => store.state.checks.applyList);

// 切换数据的时候，会自动填装到approverType中 。 因为由v-model绑定
const approverType = ref("0");
</script>

<style scoped lang="scss">
.apply-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
}

.apply-table {
  margin: 10px;
}
</style>
