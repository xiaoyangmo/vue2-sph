import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

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

export default new VueRouter({
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
            path: '/',
            redirect:'/home'
        },
    ]
})