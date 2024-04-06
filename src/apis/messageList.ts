import request from "@/utils/http";

//留言列表
export const messageListApi = (params = {}) => {
  return request({
    url: "/magic-medicine/messageBoard/messagesList",
    method: "post",
    params,
  });
};
