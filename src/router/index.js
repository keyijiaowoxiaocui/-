import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    hidden:true,
    redirect: 'Login', //重定向
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/home',
    name: '各期简书博客',
    iconClass:'fa fa-users',
    // redirect: '/home/Four', //重定向
    component: () => import('../views/HomeView.vue'),
    children:[

    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
