import request from "@/plugins/request";

export function bulletins() {
  return request({
    url: "/memberWeb/init/bulletins",
    method: "post"
  });
}

export function popupMessage(data) {
  return request({
    url: "/memberWeb/memberCenter/popupMessage",
    method: "post",
    data
  });
}

export function logo(data) {
  return request({
    url: "/memberWeb/init/logo",
    method: "post",
    data
  });
}

export function carousel(data) {
  return request({
    url: "/memberWeb/init/carousel",
    method: "post",
    data
  });
}

export function findGameTypeList(data) {
  return request({
    url: "/memberWeb/init/findGameTypeList",
    method: "post",
    data
  });
}