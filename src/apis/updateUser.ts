import request from "@/utils/http";

//编辑用户
export const updateUserApi = (params = {}) => {
  return request({
    url: "/magic-medicine/usersManage/updateUser",
    method: "post",
    params,
  });
};
