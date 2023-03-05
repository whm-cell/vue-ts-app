// ①引入userStore
import { createStore, useStore as baseUseStore } from "vuex";

// 引入vuex-persist 持久化①
import VuexPersistence from "vuex-persist";

// ② 引入store 模块和InjectionKey
// InjectionKey是一个泛型，泛型的类型是Store

import type { Store } from "vuex";
import type { InjectionKey } from "vue";

//
import users from "./modules/users";
import news from "./modules/news";
import checks from "./modules/checks";
import signs from "./modules/signs";

// 引入store模块的接口们
import type { UsersState } from "./modules/users";
import type { NewsState } from "./modules/news";
import type { ChecksState } from "./modules/checks";
import type { SignState } from "./modules/signs";

// ③ 定义state接口
export interface State {
  // [index: string]: unknown;
}

export interface StateAll extends State {
  users: UsersState;
  news: NewsState;
  checks: ChecksState;
  signs: SignState;
}

// 引入vuex-persist 持久化②
const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,

  // ④定义持久化的模块
  reducer: (state: State) => ({
    // 将state 转换为StateAll类型
    // 这里可以点击出state的原因是：  users的类型是UsersState，UsersState中有token，所以可以点击出来
    users: { token: (state as StateAll).users.token },
  }),
});

export const key: InjectionKey<Store<StateAll>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    news,
    checks,
    signs,
  },
  // 引入vuex-persist 持久化③使persist插件生效
  plugins: [vuexLocal.plugin],
});
