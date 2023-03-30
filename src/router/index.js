import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import {getToken} from '@/utils/token'
import store from '@/store'

const originalPush=VueRouter.prototype.push;
const originalReplace=VueRouter.prototype.replace;
VueRouter.prototype.push=function (location,resolve,reject){
    if(resolve||reject){
        return originalPush.call(this,location,resolve,reject)
    }else
        return originalPush.call(this,location).catch(err=>err)
}
VueRouter.prototype.replace=function (location,resolve,reject){
    if(resolve||reject){
        return originalReplace.call(this,location,resolve,reject)
    }else
        return originalReplace.call(this,location).catch(err=>err)
}

let router=new VueRouter({
    mode:"history",
    routes:[
        {
            name:'home',
            path: '/home',
            component:Home,
            meta:{show:true}
        },
        {
            name:'login',
            path: '/login',
            component:Login,
            meta:{show:false}
        },
        {
            name:'register',
            path: '/register',
            component:Register,
            meta:{show:false}
        },
        {
            name:'search',
            path: '/search/:keyword?',
            component:Search,
            meta:{show:true}
        },
        {
            name:'detail',
            path: '/detail/:skuId',
            component:Detail,
            meta:{show:true}
        },
        {
            name:'AddCartSuccess',
            path: '/AddCartSuccess',
            component:AddCartSuccess,
            meta:{show:true}
        },
        {
            name:'ShopCart',
            path: '/ShopCart',
            component:ShopCart,
            meta:{show:true}
        },
        {
            path: '*',
            redirect:'/home'
        },
    ],
    scrollBehavior () {
        return { y: 0 }
    }
})

router.beforeEach((to,from,next) => {
    let token=getToken();
    if(token){
        if(to.path==='/login'||to.path==='/register'){
            next('/')
        }else {
            let name=store.state.user.userInfo.name;
            if(name){
                next()
            }else {
                let result= store.dispatch('user/getUserInfo');
                result.then(()=>next()).catch(async () => {await store.dispatch('user/loginOut');next('/login')})
            }
        }
    }else {
        next()
    }
})

export default router