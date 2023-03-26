import {reqSearch} from '@/api'
export default {
    namespaced: true,
    state:{
        SearchList:{}
    },
    actions:{
        async getSearchList({commit},params={}){
            let result= await reqSearch(params);
            if(result.code>=200&&result.code<300){
                commit("SearchList",result.data)
            }
        }
    },
    mutations:{
        SearchList(state,data){
            state.SearchList=data;
        }
    },
    getters:{
        attrsList(state){
            return state.SearchList.attrsList||[]
        },
        goodsList(state){
            return state.SearchList.goodsList||[]
        },
        trademarkList(state){
            return state.SearchList.trademarkList||[]
        }
    }
}