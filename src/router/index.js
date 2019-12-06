import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

// 懒路由加载

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/Menu.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('../views/Join.vue')
  },
  {
    path: '/healthy',
    name: 'healthy',
    component: () => import('../views/Healthy.vue')
  },
  {
    path: '/patient',
    name: 'patient',
    component: () => import('../views/Patient.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/Publish.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
