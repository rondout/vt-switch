/*
 * Copyright © 2018-2021 Chengdu Vantron Technology Co., Ltd. All rights reserved.
 */
import axios from "axios"; // 引入axios模块
import { AxiosRequestConfig } from "axios";
import { BaseResponse, BaseResponseError } from "../models/base.model";
// import { store } from "../store";
import { handleResponseError, isProd, messageSaveSuccess } from "@/util";

// axios.defaults.baseURL = "http://192.168.16.120:8080";
// axios.defaults.baseURL = "http://106.12.116.25";

if (!isProd) {
  // axios.defaults.baseURL = "http://106.12.116.25";
  // 监听store中的配置文件
  //   store.subscribe(() => {
  //     const newUrl = store.getState().main.config?.base_url;
  //     if (axios.defaults.baseURL !== newUrl) {
  //       axios.defaults.baseURL = newUrl;
  //     }
  //   });
}

axios.defaults.timeout = 60000; // 设置请求超时时间

axios.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = window.localStorage.getItem("jwt_token");
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response?.status?.toString().startsWith("20")) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    // 如果检测到返回的401或者token有效时间已经过期就跳转到登录页面
    if (
      error?.response?.status === 401 &&
      error.config.url !== "/api/v2/users/password"
    ) {
      window.location.hash = "/login";
    }
    if (error?.response) {
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default class HttpController {
  get<T = BaseResponse>(url: string, config: AxiosRequestConfig<any> = {}) {
    return axios.get<any, T>(url, config);
  }

  getAction<T extends BaseResponse = BaseResponse>(
    url: string,
    config: AxiosRequestConfig<any> = {}
  ) {
    return new Promise<T>((resolve, reject) => {
      this.get<T>(url, config)
        .then((res) => {
          // 同一错误处理
          if (
            [
              BaseResponseError.ERROR_WITH_CANT_PARSE_JSON,
              BaseResponseError.ERROR_WITH_NO_ARGS,
            ].includes(res.errCode)
          ) {
            handleResponseError(res);
            reject(res);
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  post<T = BaseResponse>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig<any> = {}
  ) {
    return axios.post<any, T>(url, data, config);
  }

  postAction<T extends BaseResponse<any> = BaseResponse>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig<any> = {}
  ) {
    return new Promise<T>((resolve, reject) => {
      this.post<T>(url, data, config)
        .then((res) => {
          // 同一错误处理
          if (
            [
              BaseResponseError.ERROR_WITH_CANT_PARSE_JSON,
              BaseResponseError.ERROR_WITH_NO_ARGS,
            ].includes(res.errCode)
          ) {
            handleResponseError(res);
            reject(res);
          } else {
            messageSaveSuccess();
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  put<T = BaseResponse>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>
  ) {
    return axios.put<any, T>(url, data, config);
  }

  delete<T = BaseResponse>(url: string, params?: any) {
    return axios.delete<any, T>(url, { data: params });
  }

  all<T = BaseResponse>(promiseArray: Promise<T>[]) {
    const result = Promise.all(promiseArray);
    return result;
    // return new Promise((resolve, reject) => {
    //   Promise.all(promiseArray)
    //     .then((res) => {
    //       resolve(res);
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
    // });
  }
}
