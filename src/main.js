import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from "@/components/TypeNav"
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from './store'
import * as API from '@/api'
import { MessageBox } from 'element-ui';
//引入模拟数据工具
import '@/mock/mockServer'
import 'swiper/css/swiper.min.css'

Vue.config.productionTip = false

Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$API=API
  }
}).$mount('#app')
