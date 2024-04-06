import request from "@/utils/http";

//新增留言列表
export const addMessageApi = (params = {}) => {
  return request({
    url: "/magic-medicine/messageBoard/addMessage",
    method: "post",
    params,
  });
};
