// ①引入userStore
import { createStore, useStore as baseUseStore } from "vuex";

// ② 引入store 模块和InjectionKey
// InjectionKey是一个泛型，泛型的类型是Store

import type { Store } from "vuex";
import type { InjectionKey } from "vue";

//
import users from "./modules/users";
import news from "./modules/news";
import checks from "./modules/checks";
import sign from "./modules/sign";

// 引入store模块的接口们
import type { UsersState } from "./modules/users";
import type { NewsState } from "./modules/news";
import type { ChecksState } from "./modules/checks";
import type { SignState } from "./modules/sign";

// ③ 定义state接口
export interface State {
  // [index: string]: unknown;
}

export interface StateAll extends State {
  users: UsersState;
  news: NewsState;
  checks: ChecksState;
  sign: SignState;
}

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
    sign,
  },
});
