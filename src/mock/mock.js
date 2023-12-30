import Mock from "mockjs";
import usualPageApi from "./usualPage";

// 定义mock请求拦截
// Mock.mock("/api/usual/list", "get",(data)=>{
//     console.log(data,121212);
//     // console.log(config,111111111);
// });
// Mock.mock(/api\/usual\/list/, "get", (data) => {
//   usualPageApi.getList(data);
// });
Mock.mock(/api\/usual\/userList/, "get", usualPageApi.getUserList);
Mock.mock(/api\/usual\/user/, "get", usualPageApi.getUserDetailsById);
Mock.mock("/api/usual/list/updateById", "post", usualPageApi.updateUserStatusById);
Mock.mock("/api/usual/list/userAdd", "post", usualPageApi.userAdd);
Mock.mock("/api/usual/list/userEdit", "post", usualPageApi.userEdit);
Mock.mock(/api\/usual\/userDelete/, "delete", usualPageApi.userDeleteById);
