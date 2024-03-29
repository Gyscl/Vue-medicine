import request from "@/utils/http";

//查询Api
export const searchApi = (params = {}) => {
  return request({
    url: "/magic-medicine/seach",
    method: "post",
    params,
  });
};
