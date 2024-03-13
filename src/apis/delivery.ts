import request from "@/utils/http";

//发货
export const deliveryApi = (params = {}) => {
  return request({
    url: "/magic-medicine/orderManage/delivery",
    method: "post",
    params,
  });
};
