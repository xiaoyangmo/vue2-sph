import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from "@/components/TypeNav"
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from './store'
//引入模拟数据工具
import '@/mock/mockServer'
import 'swiper/css/swiper.min.css'

Vue.config.productionTip = false

Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
