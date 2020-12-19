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
Vue.use(ElementUI);

Vue.prototype.axios = axios

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
