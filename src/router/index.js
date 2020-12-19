import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import adminRouter from './admin'

Vue.use(VueRouter)

const routes = [ 
  movieRouter,
  cinemaRouter,
  mineRouter,
  adminRouter,
  
  // 重定向
  {
    path : '/*',
    redirect : '/movie', 
  }
] 

const router = new VueRouter({
  mode: 'history',
//   base: process.env.BASE_URL,
    // base:'miaomiaocinema',
    routes
})

export default router
