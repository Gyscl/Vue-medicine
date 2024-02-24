import request from "@/utils/http";

//用户订单信息
export const userOrderApi = (uid: any) => {
  return request({
    url: "/magic-medicine/userOrder",
    method: "post",
    params: { uid },
  });
};
