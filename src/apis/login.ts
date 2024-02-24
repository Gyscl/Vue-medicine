import request from '@/utils/http'

//用户登录
export const loginApi=(params={})=>{
    return request({
        url:'/magic-medicine/login',
        method:'post',
        params
    })
}  