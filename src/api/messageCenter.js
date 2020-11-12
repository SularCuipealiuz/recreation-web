import request from "@/plugins/request";

export function siteMessage() {
  return request({
    url: "/memberWeb/messageCenter/siteMessage",
    method: "post"
  });
}

export function messageRead(data) {
  return request({
    url: "/memberWeb/messageCenter/messageRead",
    method: "post",
    data
  });
}

export function messageDelete(data) {
  return request({
    url: "/memberWeb/messageCenter/messageDelete",
    method: "post",
    data
  });
}

export function siteBulletin() {
  return request({
    url: "/memberWeb/messageCenter/siteBulletin",
    method: "post"
  });
}

export function bulletinRead(data) {
  return request({
    url: "/memberWeb/messageCenter/bulletinRead",
    method: "post",
    data
  });
}

export function bulletinDelete(data) {
  return request({
    url: "/memberWeb/messageCenter/bulletinDelete",
    method: "post",
    data
  });
}

export function mail(data) {
  return request({
    url: "/memberWeb/messageCenter/mail",
    method: "post",
    data
  });
}

export function sendMail(data) {
  return request({
    url: "/memberWeb/messageCenter/sendMail",
    method: "post",
    data
  });
}

export function replyMail(data) {
  return request({
    url: "/memberWeb/messageCenter/replyMail",
    method: "post",
    data
  });
}

export function readMail(data) {
  return request({
    url: "/memberWeb/messageCenter/readMail",
    method: "post",
    data
  });
}