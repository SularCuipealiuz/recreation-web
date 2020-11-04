import axios from "axios";
import store from "@/store";
import { getToken } from "@/plugins/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 30000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["token"] = getToken();
    }

    config.headers["Authorization"] =
      "Basic enVpaG91X3VpOnp1aWhvdV91aV9zZWNyZXQ=";
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    let isCaptcha = false;

    if (response.config.url === "/api/oauth/anno/captcha") {
      isCaptcha = true;
    }

    if (isCaptcha) {
      return res;
    }

    if (res.code !== 0) {
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res.data;
    }
  },
  error => {
    console.log("Request Error:" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
