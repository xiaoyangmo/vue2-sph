import {getCartList,addShopCar,cartChecked,deleteCart} from '@/api'

export default {
    namespaced: true,
    state:{
        CartList:[]
    },
    actions:{
        async getCartList({commit}){
            let result= await getCartList();
            if(result.code>=200&&result.code<300){
                commit("getCartList",result.data)
            }
        },
        async cartChecked(state,{skuID,isChecked}){
            let result= await cartChecked(skuID,isChecked);
            if(result.code===200){
                return 'ok'
            }
        },
        async updateShopCar(state,{skuID,disNum}){
            let result= await addShopCar(skuID,disNum);
            if(result.code===200){
                return 'ok'
            }
            return Promise.reject(new Error(result.message))
        },
        async deleteCart(state,skuID){
            let result= await deleteCart(skuID);
            if(result.code===200){
                return 'ok'
            }
            return Promise.reject(new Error(result.message))
        },
    },
    mutations:{
        getCartList(state,data){
            if(data[0].cartInfoList.length>0){
                state.CartList=data[0].cartInfoList
            }
        }
    },
    getters:{

    }
}