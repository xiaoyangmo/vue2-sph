import {reqDetail} from '@/api'
export default {
    namespaced: true,
    state:{
        Detail:{}
    },
    actions:{
        async getDetail({commit},skuId){
            let result= await reqDetail(skuId);
            if(result.code>=200&&result.code<300){
                commit("getDetail",result.data)
            }
        }
    },
    mutations:{
        getDetail(state,data){
            state.Detail=data;
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