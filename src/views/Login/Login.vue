<template>
  <div>hello login</div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import http from "@/utils/http";

const store = useStore();

// 调用store中的login方法
store
  .dispatch("users/login", {
    email: "huangrong@imooc.com",
    pass: "huangrong",
  })
  .then((res) => {
    console.log(res);
  });

// store 获取vuex中的数据
const aa = store.getters.getToken;
console.log("aaaa" + aa);

// http
//   .post("/users/login", {
//     email: "huangrong@imooc.com",
//     pass: "huangrong",
//   })
//   .then((res) => {
//     console.log(res.data);
//   });
</script>

<style scoped lang="scss"></style>
