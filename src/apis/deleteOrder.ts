import request from "@/utils/http";

//删除
export const deleteOrderApi = (params = {}) => {
  return request({
    url: "/magic-medicine/orderManage/deleteOrder",
    method: "post",
    params,
  });
};
