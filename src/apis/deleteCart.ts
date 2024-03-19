import request from "@/utils/http";

//删除购物车Api
export const deleteCartApi = (cid:any) => {
  return request({
    url: "/magic-medicine/deleteCart",
    method: "post",
    params:{cid}
  });
};
