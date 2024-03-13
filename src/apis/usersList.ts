import request from "@/utils/http";

//用户列表
export const usersListApi = (params = {}) => {
  return request({
    url: "/magic-medicine/usersManage/userList",
    method: "post",
    params,
  });
};
