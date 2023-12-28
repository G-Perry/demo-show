import http from "@/utils/request";

// export const getData = (data) => {
//   return http.get("/usual/list", data);
// };

export function getData(data) {
  return http.request({
    url: "/usual/list",
    method: "get",
    params: data,
  });
}
