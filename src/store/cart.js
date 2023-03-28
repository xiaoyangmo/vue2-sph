import {getCartList} from '@/api'

export default {
    namespaced: true,
    state:{
        CartList:{}
    },
    actions:{
        async getCartList({commit}){
            let result= await getCartList();
            console.log(result);
            if(result.code>=200&&result.code<300){
                commit("getCartList",result.data)
            }
        },
    },
    mutations:{
        getCartList(state,data){
            state.CartList=data
        }
    },
    getters:{

    }
}