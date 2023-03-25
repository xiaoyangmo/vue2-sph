import requests from "./request"
import mock from "./mock"

export const reqCategoryList=()=>requests({
    method: "GET",
    url:'/product/getBaseCategoryList'
})

export const mockBanner = ()=>mock.get('/banners')

export const mockFloor = ()=>mock.get('/floors')