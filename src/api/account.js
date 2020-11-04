import request from "@/plugins/request";

export function registerConfig(data) {
  return request({
    url: "/memberWeb/init/registerConfig",
    method: "post",
    data
  });
}

export function captcha(data) {
  return request({
    url: "/api/oauth/anno/captcha",
    method: "post",
    responseType: "arraybuffer",
    data
  });
}

export function register(data) {
  return request({
    url: "/memberWeb/init/register",
    method: "post",
    data
  });
}

export function login(data) {
  return request({
    url: "/api/oauth/anno/member/login",
    method: "post",
    data
  });
}

export function registerCheck(data) {
  return request({
    url: "/memberWeb/init/registCheck",
    method: "post",
    data
  });
}

export function logout(data) {
  return request({
    url: "/api/oauth/anno/member/logout",
    method: "post",
    data
  });
}

export function verify(data) {
  return request({
    url: "/api/oauth/anno/verify",
    method: "post",
    data
  });
}