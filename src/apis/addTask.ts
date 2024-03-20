import request from "@/utils/http";

//新增待办事项列表
export const addTaskApi = (params={}) => {
  return request({
    url: "/magic-medicine/todoList/addTask",
    method: "post",
    params,
  });
};
