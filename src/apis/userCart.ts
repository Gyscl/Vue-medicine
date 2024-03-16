import request from "@/utils/http";

//用户购物车药品信息
export const userCartApi = (params={}) => {
  return request({
    url: "/magic-medicine/userCart",
    method: "post",
    params
  });
};
