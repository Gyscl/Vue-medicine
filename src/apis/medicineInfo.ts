import request from '@/utils/http'

//药品分类信息
export const medicineInfoApi=()=>{
    return request({
        url:'/magic-medicine/medicineList',
        method:'get'
    })
}