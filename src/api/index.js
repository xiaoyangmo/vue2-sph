import requests from "./request"
import mock from "./mock"

export const reqCategoryList=()=>requests({
    method: "GET",
    url:'/product/getBaseCategoryList'
})
export const reqSearch=(params)=>requests({
    method: "POST",
    url:'/list',
    data:params
})
export const reqDetail=(skuid)=>requests({
    method: "get",
    url:`/item/${skuid}`
})
export const addShopCar=(skuId,skuNum)=>requests({
    method: "POST",
    url:`/cart/addToCart/${ skuId }/${ skuNum }`
})
export const getCartList=()=>requests({
    method: "get",
    url:'/cart/cartList'
})
export const cartChecked=(skuID,isChecked)=>requests({
    method: "get",
    url:`/cart/checkCart/${skuID}/${isChecked}`
})
export const deleteCart=(skuId)=>requests({
    method: "DELETE",
    url:`/cart/deleteCart/${skuId}`
})
export const sendCode=(phone)=>requests({
    method: "get",
    url:`/user/passport/sendCode/${phone}`
})
export const register=(data)=>requests({
    method: "post",
    url:'/user/passport/register',
    data
})
export const login=(data)=>requests({
    method: "post",
    url:'/user/passport/login',
    data
})
export const getUserInfo=()=>requests({
    method: "get",
    url:'/user/passport/auth/getUserInfo'
})
export const loginOut=()=>requests({
    method: "get",
    url:'/user/passport/logout'
})
export const getTrade=()=>requests({
    method: "get",
    url:'/order/auth/trade'
})
export const submitOrder=(tradeNo,data)=>requests({
    method: "post",
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data
})
export const getOrder=(orderId)=>requests({
    method: "get",
    url:`/payment/weixin/createNative/${orderId}`
})
export const getPay=(orderId)=>requests({
    method: "get",
    url:`/payment/weixin/queryPayStatus/${orderId}`
})

export const mockBanner = ()=>mock.get('/banners')

export const mockFloor = ()=>mock.get('/floors')
