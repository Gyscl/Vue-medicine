import request from "@/utils/http";

//更行待办事项状态
export const updateTaskApi = (params={}) => {
  return request({
    url: "/magic-medicine/todoList/updateStatus",
    method: "post",
    params
  });
};
