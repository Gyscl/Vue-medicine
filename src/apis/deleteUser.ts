import request from "@/utils/http";

//删除用户
export const deleteUserApi = (params = {}) => {
  return request({
    url: "/magic-medicine/usersManage/deleteUser",
    method: "post",
    params,
  });
};
