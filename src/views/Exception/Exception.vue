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
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const date = new Date();

const year = date.getFullYear();
// const month = computed(() => {
//   return date.getMonth() + 1;
// })

//Number(route.query.month) 没有值的话，会选择后面的！
const month = ref(Number(route.query.month) || date.getMonth() + 1);

/*  为了让month变化时，数据传递到当前的url上！ */
watch(month, () => {
  // router 的  push方法，可以传递一个对象，对象中的query属性，就是传递的数据
  router.push({
    query: {
      month: month.value,
    },
  });
});
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
