import http from "@/utils/http";
import type { MutationTree, ActionTree, GetterTree, ActionContext } from "vuex";
import type { State } from "../index";

export interface UsersState {}

const state: UsersState = {
  // 这里写数据
};

const mutations: MutationTree<UsersState> = {};
const actions: ActionTree<UsersState, State> = {
  // 这里写请求接口
  async login(context: ActionContext<UsersState, State>, payload: any) {
    const { data } = await http.post("/users/login", payload);
    // context.commit("setToken", data.token);
    return data;
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
