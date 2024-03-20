import request from "@/utils/http";

//今日待办事项列表
export const taskListApi = () => {
  return request({
    url: "/magic-medicine/todoList/getTask",
    method: "get",
  });
};
