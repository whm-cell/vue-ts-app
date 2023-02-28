import http from "@/utils/http";
import type { MutationTree, ActionTree, GetterTree, ActionContext } from "vuex";
import type { State } from "../index";

export interface UsersState {
  // 这里写接口，定义类型  下边赋初始值
  token: string;
}

const state: UsersState = {
  // 这里写数据
  token: "",
};

// mutations 作用为修改state中的数据
const mutations: MutationTree<UsersState> = {
  // 更新token
  updateToken(state: UsersState, payload: string) {
    state.token = payload;
  },
};
const actions: ActionTree<UsersState, State> = {
  // 这里写请求接口
  async login(context: ActionContext<UsersState, State>, payload: any) {
    return await http.post("/users/login", payload);
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
