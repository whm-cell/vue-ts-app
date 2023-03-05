<template>
  <div>
    <el-descriptions border direction="vertical" :column="9">
      <el-descriptions-item label="月份">{{ month }}月</el-descriptions-item>
      <el-descriptions-item
        v-for="(value, key) in DetailKey"
        :key="key"
        :label="value"
      >
        {{ detailValue[key] }}
      </el-descriptions-item>
      <el-descriptions-item label="操作">
        <el-button type="primary" @click="handleToException" plain size="small">
          查看详情</el-button
        >
      </el-descriptions-item>
      <el-descriptions-item label="考勤状态">
        <el-tag :type="detailState.type" size="small">
          {{ detailState.text }}</el-tag
        >
      </el-descriptions-item>
    </el-descriptions>

    <el-calendar v-model="value">
      <template #header>
        <el-button type="primary" size="small">在线签到</el-button>
        <el-space>
          <el-button plain>2022年</el-button>
          <el-select v-model="month" @change="handleChange" size="small">
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
      <template #dateCell="{ data }">
        <div>{{ renderDate(data.day) }}</div>
        <div class="show-time">{{ renderTime(data.day) }}</div>
      </template>
    </el-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
// 引入编程式路由
import { useRouter } from "vue-router";
import { useStore } from "@/store";

const store = useStore();

const router = useRouter();
/*  v-model 必须接响应式数据，比如由ref修饰的数据 */
const value = ref(new Date());

// 获取年和月
const year = value.value.getFullYear();
const month = ref(value.value.getMonth() + 1);

enum DetailKey {
  normal = "正常出勤",
  absent = "缺勤",
  miss = "漏打卡",
  late = "迟到",
  leave = "早退",
  lateAndEarly = "迟到早退",
}

const detailState = reactive({
  // 断言的意思：告诉ts，这个值是success或者danger
  type: "success" as "success" | "danger",
  text: "正常" as "正常" | "异常",
});

const detailValue = reactive({
  normal: 0,
  absent: 0,
  miss: 0,
  late: 0,
  leave: 0,
  lateAndEarly: 0,
});

const handleChange = () => {
  value.value = new Date(year, month.value - 1);
};

const handleToException = () => {
  router.push("/exception");
};

// 获取打卡信息
const signsInfos = computed(() => {
  return store.state.signs.infos;
});

const renderDate = (day: string) => {
  return day.split("-")[2] + "日";
};

const renderTime = (time: string) => {
  console.log("1111", time);
  const [, month, day] = time.split("-");

  const ret = (
    (signsInfos.value.time as { [index: string]: unknown })[month] as {
      [index: string]: unknown;
    }
  )[day];

  if (Array.isArray(ret)) {
    return ret.join("-");
  }

  return ret;
};
</script>

<style scoped lang="scss">
.el-descriptions {
  margin: 10px;
}
.el-select {
  width: 80px;
}

.show-time {
  text-align: center;
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: auto;
}
</style>
