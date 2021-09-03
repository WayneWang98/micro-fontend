import Vue from 'vue'
import VueRouter from 'vue-router'
import Energy from '../pages/energy/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/energy', // energy page
    name: 'Energy',
    component: Energy
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes
})

export default router
