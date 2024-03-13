import request from "@/utils/http";

//药品列表
export const medicineListApi = (params = {}) => {
  return request({
    url: "/magic-medicine/medicineManage/list",
    method: "post",
    params,
  });
};
