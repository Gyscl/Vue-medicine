import request from "@/utils/http";

//订单列表
export const orderListApi = (params = {}) => {
  return request({
    url: "/magic-medicine/orderManage/orderList",
    method: "post",
    params,
  });
};
