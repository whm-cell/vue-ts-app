<template>
  <div class="login">
    <dev class="header">
      <span class="header-logo">
        <i class="iconfont icon-vue"></i>
        <i class="iconfont icon-icon-test"></i>
        <i class="iconfont icon-typescript"></i>
      </span>
      <span class="header-title">在线考勤系统 </span>
    </dev>
    <div class="desc">
      零基础从入门到进阶，系统掌握前端三大热门技术(Vue、React、TypeScript)
    </div>

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="main-zidingyi"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
          auto-insert-space
          >登录</el-button
        >
        <!-- <el-button @click="resetForm(ruleFormRef)">重置</el-button> -->
      </el-form-item>
    </el-form>

    <div class="users">
      <el-row :gutter="20">
        <el-col :span="12" v-for="item in testUser" :key="item.email">
          <h3>
            测试账号<el-button @click="autoLogin(item)">一键登录</el-button>
          </h3>
          <p>邮箱：{{ item.email }}</p>
          <p>密码：{{ item.pass }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

//ruleFormRef 和element-plus的FormInstance类型
const ruleFormRef = ref<FormInstance>();

interface User {
  email: string;
  pass: string;
}

// 收集数据的对象
const ruleForm = reactive<User>({
  email: "",
  pass: "",
});

// 添加测试账号
const testUser: User[] = [
  {
    email: "huangrong@imooc.com",
    pass: "huangrong",
  },
  {
    email: "huangrong@imooc.com",
    pass: "huangrong",
  },
];

const rules = reactive<FormRules>({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  pass: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "长度在 6 到 20 个字符",
      trigger: "blur",
    },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const autoLogin = (user: User) => {
  ruleForm.email = user.email;
  ruleForm.pass = user.pass;

  // 这里接的是form表单的ref！！ 实例！ 而不是ruleForm!!!! 一定注意
  submitForm(ruleFormRef.value);
};
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/images/login-bg.svg") no-repeat center 110px;
  background-size: 100%;
  .header {
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34px;
    padding-top: 100px;
    .header-logo {
      .icon-vue,
      .icon-icon-test,
      .icon-typescript {
        margin-right: 5px;
        font-size: inherit;
      }
      .icon-vue {
        color: green;
      }
      .icon-icon-test {
        color: #deb887;
      }
      .icon-typescript {
        color: blue;
      }
    }
    .header-title {
      margin-left: 30px;
      font-weight: 700;
      font-size: 30px;
    }
  }
  .desc {
    text-align: center;
    padding-top: 30px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
  }
  .main-zidingyi {
    width: 500px;
    margin: 0 auto;
    padding-top: 50px;
  }
  .users {
    width: 500px;
    margin: 60px auto;
    color: rgba(0, 0, 0, 0.65);
    h3 {
      font-size: 16px;
    }
    p {
      margin: 20px;
    }
  }
}
</style>
