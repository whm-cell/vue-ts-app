import http from "@/utils/http";
import type { MutationTree, ActionTree, GetterTree, ActionContext } from "vuex";
import type { State } from "../index";

interface Infos {
  [index: string]: unknown;
}
export interface UsersState {
  // 这里写接口，定义类型  下边赋初始值
  token: string;
  infos: Infos;
}

const state: UsersState = {
  // 这里写数据
  token: "",
  infos: {},
};

// mutations 作用为修改state中的数据
const mutations: MutationTree<UsersState> = {
  // 更新token
  updateToken(state: UsersState, payload: string) {
    state.token = payload;
  },
  // 更新用户信息
  updateInfos(state: UsersState, payload: Infos) {
    state.infos = payload;
  },
  // 清空token
  clearToken(state: UsersState) {
    state.token = "";
  },
};
const actions: ActionTree<UsersState, State> = {
  // 这里写请求接口
  async login(context: ActionContext<UsersState, State>, payload) {
    return await http.post("/users/login", payload);
  },
  infos() {
    // 获取用户信息
    return http.get("/users/infos");
  },
};
const getters: GetterTree<UsersState, State> = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
