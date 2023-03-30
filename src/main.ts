import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { createPinia } from "pinia";
import { setupStore } from "@/store";
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局注册 状态管理(store)
setupStore(app);

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(createPinia())
  .use(router)
  .mount("#app");
