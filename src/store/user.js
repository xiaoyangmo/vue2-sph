import {register, sendCode,login,getUserInfo,loginOut} from '@/api'
import {setToken,removeToken} from "@/utils/token";

export default {
    namespaced: true,
    state:{
        userInfo:[]
    },
    actions:{
        async sendCode(state,phone){
            let result= await sendCode(phone);
            if(result.code===200){
                return result.data
            }
            return Promise.reject(new Error(result.message))
        },
        async register(state,data){
            let result= await register(data);
            if(result.code===200){
                return result.data
            }
            return Promise.reject(result)
        },
        async userLogin(state,data){
            let result= await login(data);
            if(result.code===200){
                let token=result.data.token;
                setToken(token);
                return result.data
            }
            return Promise.reject(result)
        },
        async loginOut({commit}){
            let result= await loginOut();
            if(result.code===200){
                commit('clearUserInfo')
                return 'ok'
            }
            return Promise.reject(result)
        },
        async getUserInfo({commit}){
            let result= await getUserInfo();
            if(result.code===200){
                commit('getUserInfo',result.data)
                return 'ok'
            }
            return Promise.reject(result)
        },
    },
    mutations:{
        getUserInfo(state,data){
            state.userInfo=data
        },
        clearUserInfo(state){
            removeToken();
            state.userInfo= [];
        }
    },
    getters:{

    }
}