import request from "@/utils/http";

//更新药品Api
export const updateMedicineApi = (params = {}) => {
  return request({
    url: "/magic-medicine/medicineManage/updateMedicine",
    method: "post",
    params,
  });
};
