import request from "@/utils/http";

//添加购物车Api
export const addCartApi = (params={}) => {
  return request({
    url: "/magic-medicine/addCart",
    method: "post",
    params,
  });
};
