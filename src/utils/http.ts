import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "@/store";
import type { StateAll } from "@/store";
import { ElMessage } from "element-plus";

// 封装axios - ①
const instance = axios.create({
  baseURL: "http://api.h5ke.top",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 封装axios - ②
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (config.headers) {
      // 防止headers为undefined
      config.headers.authorization =
        (store.state as StateAll).users.token || "";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 封装axios - ③
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.data.errmsg === "token error") {
      ElMessage.error("登录过期，请重新登录");
      store.commit("users/clearToken", "");
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

interface Data {
  [index: string]: unknown;
}

interface Http {
  get: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;

  post: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;

  put: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;

  delete: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
}

// 封装axios - ④
// http对象的封装
export const http: Http = {
  get(url, data, config) {
    return instance.get(url, { params: data, ...config });
  },

  post(url, data, config) {
    return instance.post(url, data, config);
  },
  put(url, data, config) {
    return instance.put(url, data, config);
  },
  delete(url, data, config) {
    return instance.delete(url, { params: data, ...config });
  },
};

export default http;
