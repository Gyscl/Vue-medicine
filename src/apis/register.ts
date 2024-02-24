import request from '@/utils/http'

//注册用户
export const addUserApi=(params={})=>{
    return request({
        url:'/magic-medicine/register',
        method:'post',
        params
    })
}