import request from "@/plugins/request";

export function transactionRecord(data) {
  return request({
    url: "/memberWeb/transactionRecord/query",
    method: "post",
    data
  });
}

export function bettingRecord(data) {
  return request({
    url: "/memberWeb/betRecord/query",
    method: "post",
    data
  });
}

export function discountRecord(data) {
  return request({
    url: "/memberWeb/activityCenter/activityApplyRecord",
    method: "post",
    data
  });
}