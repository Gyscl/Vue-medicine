import request from "@/utils/http";

//删除药品Api
export const deleteMedicineApi = (params = {}) => {
  return request({
    url: "/magic-medicine/medicineManage/deleteMedicine",
    method: "post",
    params,
  });
};
