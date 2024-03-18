import request from "@/utils/http";

//库存数量Api
export const stockNumApi = () => {
  return request({
    url: "/magic-medicine/stockNum",
    method: "get",
  });
};
