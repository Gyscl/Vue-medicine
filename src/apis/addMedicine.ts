import request from "@/utils/http";

//添加药品Api
export const addMedicineApi = (params = {}) => {
  return request({
    url: "/magic-medicine/medicineManage/addMedicine",
    method: "post",
    params,
  });
};
