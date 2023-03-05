import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import _ from "lodash";
// token 从状态管理里面取
import store from "@/store";
import type { StateAll } from "@/store";

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
        // 添加独享守卫(路由独享守卫: 在路由配置中配置的守卫)
        beforeEnter: (to, from, next) => {
          const usersInfos = (store.state as StateAll).users.infos;
          const signsInfos = (store.state as StateAll).signs.infos;
          if (_.isEmpty(signsInfos)) {
            store
              .dispatch("signs/getTime", { userid: usersInfos._id })
              .then((res) => {
                if (res.data.errcode === 0) {
                  //持久化登录后的用户信息
                  store.commit("signs/updateInfos", res.data.infos);
                  next();
                }
              });
          } else {
            next();
          }
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

router.beforeEach((to, from, next) => {
  // 获取token
  // const token = localStorage.getItem("token");
  const token = (store.state as StateAll).users.token;
  const infos = (store.state as StateAll).users.infos;
  console.log("token", token);
  // 判断是否有token
  if (to.meta.auth && _.isEmpty(infos)) {
    if (token) {
      store.dispatch("users/infos").then((res) => {
        if (res.data.errcode === 0) {
          //持久化登录后的用户信息
          store.commit("users/updateInfos", res.data.infos);
          next();
        }
      });
      // next();
    } else {
      next("/login");
    }
  } else {
    // 如果有token，且访问的是登录页，直接跳转到首页
    if (token && to.path === "/login") {
      next("/");
    } else {
      next();
    }
  }
});

/* router.beforeEach((to, from, next) => {
  // 1. 获取token
  const token = localStorage.getItem("token");
  // 2. 判断是否有token
  if (token) {
    // 2.1 判断是否是登录页
    if (to.path === "/Login") {
      // 2.1.1 如果是登录页，直接跳转到首页
      next("/");
    } else {
      // 2.1.2 如果不是登录页，直接放行
      next();
    }
  } else {
    // 2.2 如果没有token
    // 2.2.1 判断是否是登录页
    if (to.path === "/Login") {
      //
      next();
    } else {
      // 2.2.2 如果不是登录页，跳转到登录页
      next("/Login");
    }
  }
}); */

export default router;
