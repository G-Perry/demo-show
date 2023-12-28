import http from "@/utils/request";

// export const getData = (data) => {
//   return http.get("/usual/list", data);
// };

export function getUserList(data) {
  return http.request({
    url: "/usual/list",
    method: "get",
    params: data,
  });
}

export function updateUserStatusById(data) {
  return http.request({
    url: "/usual/list/updateById",
    method: "post",
    data: data,
  });
}

