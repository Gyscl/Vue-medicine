import request from "@/utils/http";

//今日销量Api
export const todaySellApi = () => {
  return request({
    url: "/magic-medicine/todaySell",
    method: "get",
  });
};
