import { defineStore } from "pinia";
import http from "@/utils/http";
import { store } from "@/store";
import { useStorage } from "@vueuse/core";

export const useUsersStore = defineStore("user", () => {
  interface LoginDto {
    [index: string]: unknown;
    username: string;
    password: string;
  }

  const token = useStorage("token", "");

  const infos = useStorage("infos", {});

  const login = async (payload: LoginDto) => {
    const { data } = await http.post("/users/login", payload);
    token.value = data.token;
    return data;
  };

  const getInfos = async () => {
    const { data } = await http.get("/users/infos");
    infos.value = data;
    return data;
  };

  return {
    token,
    infos,
    login,
    getInfos,
  };
});
