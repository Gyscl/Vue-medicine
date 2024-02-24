import request from "@/utils/http";

//用户购物车药品信息
export const userCartApi = (uid: any) => {
  return request({
    url: "/magic-medicine/userCart",
    method: "post",
    params: { uid },
  });
};
