import {reqDetail,addShopCar} from '@/api'

export default {
    namespaced: true,
    state:{
        Detail:{},
        imgIndex:0
    },
    actions:{
        async getDetail({commit},skuId){
            let result= await reqDetail(skuId);
            if(result.code>=200&&result.code<300){
                commit("getDetail",result.data)
            }
        },
        async addShopCar(state,{skuId,skuNum}){
            let result= await addShopCar(skuId,skuNum);
            if(result.code===200){
                return 'ok'
            }else {
                return Promise.reject(new Error('failed'))
            }
        }
    },
    mutations:{
        getDetail(state,data){
            state.Detail=data;
        },
        getIndex(state,index){
            state.imgIndex=index;
        }
    },
    getters:{
        categoryView(state){
            return state.Detail.categoryView||{}
        },
        skuInfo(state){
            return state.Detail.skuInfo||{}
        },
        spuSaleAttrList(state){
            return state.Detail.spuSaleAttrList||[]
        }
    }
}