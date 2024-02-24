import request from "@/utils/http";

//药品分类信息
export const detailByIdApi = (id:any) => {
  return request({
    url: "/magic-medicine/detailById",
    method: "post",
    params:{id}
  });
};
