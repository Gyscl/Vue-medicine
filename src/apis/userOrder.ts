import request from "@/utils/http";

//用户订单信息
export const userOrderApi = (params={}) => {
  return request({
    url: "/magic-medicine/userOrder",
    method: "post",
    params
  });
};
