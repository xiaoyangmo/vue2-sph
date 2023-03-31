import {getTrade,submitOrder} from '@/api'

export default {
    namespaced:true,
    state:{
        detailArrayList:[],
        userAddressList:[],
        tradeList:{}
    },
    actions:{
       async getTrade({commit}){
            let result=await getTrade();
            if (result.code===200){
                commit('getTrade',result.data)
            }else {
                return Promise.reject(result.message)
            }
        },
        async submitOrder(state,{tradeNo,data}){
            let result=await submitOrder(tradeNo,data);
            if (result.code===200){
                return result.data
            }else {
                return Promise.reject(result.message)
            }
        }
    },
    mutations:{
        getTrade(state,data){
            state.detailArrayList=data.detailArrayList;
            state.userAddressList=data.userAddressList;
            state.tradeList=data;
        }
    },
    getters:{

    }
}