import http from "@/utils/http";
import type { MutationTree, ActionTree, GetterTree } from "vuex";
import type { State } from "../index";

export interface SignState {
  [index: string]: unknown;
}

const state: SignState = {};

const mutations: MutationTree<SignState> = {};
const actions: ActionTree<SignState, State> = {};
const getters: GetterTree<SignState, State> = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
