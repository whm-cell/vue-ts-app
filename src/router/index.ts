import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 路由 - ①  通过懒加载的方式引入组件
const Login = () => import("@/views/Login/Login.vue");
const Home = () => import("@/views/Home/Home.vue");
const Exception = () => import("@/views/Exception/Exception.vue");
const Sign = () => import("@/views/Sign/Sign.vue");
const Apply = () => import("@/views/Apply/Apply.vue");
const Check = () => import("@/views/Check/Check.vue");

// 对router-menu组件进行权限控制
// 1. 在路由中配置路由元信息
// 2. 在路由守卫中获取路由元信息
// 3. 在router-menu组件中获取路由元信息
declare module "vue-router" {
  interface RouteMeta {
    menu?: boolean;
    title?: string;
    icon?: string;
    auth?: boolean;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    // 配置二级路由  ③
    // 二级路由 必须得在Home.vue中使用 <router-view></router-view> 标签来展示

    // 重定向配置(访问home可以进入到sign页面)
    redirect: "/sign",

    meta: {
      // menu: true
      menu: true,
      title: "考勤管理",
      icon: "document-copy",
      auth: true,
    },
    children: [
      {
        path: "sign",
        name: "sign",
        component: Sign,
        meta: {
          menu: true,
          title: "在线打卡签到",
          icon: "calendar",
          auth: true,
        },
      },
      {
        path: "exception",
        name: "exception",
        component: Exception,
        meta: {
          menu: true,
          title: "考勤异常申请",
          icon: "warning",
          auth: true,
        },
      },
      {
        path: "apply",
        name: "apply",
        component: Apply,
        meta: {
          menu: true,
          title: "添加考勤审批",
          icon: "document-add",
          auth: true,
        },
      },
      {
        path: "check",
        name: "check",
        component: Check,
        meta: {
          menu: true,
          title: "添加考勤审批",
          icon: "finished",
          auth: true,
        },
      },
    ],
  },
  {
    // 配置一级路由-② 通过配置路由元信息，来实现权限控制
    path: "/Login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
