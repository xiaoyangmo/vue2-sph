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

export const mockBanner = ()=>mock.get('/banners')

export const mockFloor = ()=>mock.get('/floors')
