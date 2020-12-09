import request from "@/plugins/request";

export function getUserInfo(data) {
  return request({
    url: "/memberWeb/memberCenter/info",
    method: "post",
    data
  });
}

export function edit(data) {
  return request({
    url: "/memberWeb/memberCenter/edit",
    method: "post",
    data
  });
}

export function avatar(data) {
  return request({
    url: "/memberWeb/memberCenter/avatar",
    method: "post",
    data
  });
}

export function changePassword(data) {
  return request({
    url: "/memberWeb/memberCenter/edit/password",
    method: "post",
    data
  });
}

export function changeWithdrawPassword(data) {
  return request({
    url: "/memberWeb/memberCenter/edit/withdrawPassword",
    method: "post",
    data
  });
}

export function bankList() {
  return request({
    url: "/tenantManage/dic/withdraw/initBank",
    method: "post"
  });
}