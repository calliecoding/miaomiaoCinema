import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



//引入全局组件
import axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
//注册成全局组件
Vue.component('Scroller',Scroller)
Vue.component('Loading',Loading)





//引入第三方组件库
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'; //图片懒加载


Vue.use(ElementUI);
Vue.use(VueLazyload,{
    loading: require("@/assets/loading.jpg"),//加载中图片，一定要有，不然会一直重复加载占位图
    error: require("@/assets/error.jpg")  //加载失败图片
})


Vue.prototype.axios = axios

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
