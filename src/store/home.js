import {reqCategoryList,mockBanner,mockFloor} from '@/api'
export default {
    namespaced: true,
    state:{
        CategoryList:[],
        BannerList:[],
        FloorList:[]
    },
    actions:{
        async getCategory({commit}){
            let result= await reqCategoryList();
            if(result.code>=200&&result.code<300){
                commit("CategoryList",result.data)
            }
        },
        async getBanner({commit}){
            let result= await mockBanner();
            if(result.code>=200&&result.code<300){
                commit("BannerList",result.data)
            }
        },
        async getFloor({commit}){
            let result= await mockFloor();
            if(result.code>=200&&result.code<300){
                commit("FloorList",result.data)
            }
        }
    },
    mutations:{
        CategoryList(state,data){
            state.CategoryList=data.slice(0,15);
        },
        BannerList(state,data){
            state.BannerList=data;
        },
        FloorList(state,data){
            state.FloorList=data;
        }
    },
    getters:{

    }
}