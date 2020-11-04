import request from "@/plugins/request";

export function activity(data) {
  return request({
    url: "/memberWeb/activityCenter/activity",
    method: "post",
    data
  });
}

export function activityDetail(data) {
  return request({
    url: "/memberWeb/activityCenter/activityDetail",
    method: "post",
    data
  });
}

export function activityApply(data) {
  return request({
    url: "/memberWeb/activityCenter/activityApply",
    method: "post",
    data
  });
}

export function activityApplyRecord(data) {
  return request({
    url: "/memberWeb/activityCenter/activityApplyRecord",
    method: "post",
    data
  });
}

export function findGameTypeSelectItem(data) {
  return request({
    url: "/api/tenantManage/activity/gamePlatform/findGameTypeSelectItem",
    method: "post",
    data
  });
}