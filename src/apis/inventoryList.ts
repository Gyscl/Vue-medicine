import request from "@/utils/http";

//库存列表
export const inventoryListApi = (params={}) => {
  return request({
    url: "/magic-medicine/inventoryManage/list",
    method: "post",
    params
  });
};
