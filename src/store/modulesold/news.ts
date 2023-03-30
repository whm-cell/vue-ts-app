import http from "@/utils/http";
import type { MutationTree, ActionTree, GetterTree } from "vuex";
import type { State } from "../index";

export interface NewsState {
  [index: string]: unknown;
}

const state: NewsState = {};

const mutations: MutationTree<NewsState> = {};
const actions: ActionTree<NewsState, State> = {};
const getters: GetterTree<NewsState, State> = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
