import request from "@/utils/http";

//单个购买Api
export const singleBuyApi = (params = {}) => {
  return request({
    url: "/magic-medicine/singleBuy",
    method: "post",
    params,
  });
};
