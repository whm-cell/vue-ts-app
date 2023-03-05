import http from "@/utils/http";
import type { MutationTree, ActionTree, GetterTree } from "vuex";
import type { State } from "../index";

interface Infos {
  [index: string]: unknown;
}

export interface SignState {
  infos: Infos;
}

const state: SignState = {
  infos: {},
};

const mutations: MutationTree<SignState> = {
  updateInfos(state, infos: Infos) {
    state.infos = infos;
  },
};
const actions: ActionTree<SignState, State> = {
  getTime(context, payload) {
    return http.get("/signs/time", payload);
  },
};
const getters: GetterTree<SignState, State> = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
