import Vue from 'vue'
import VueRouter from 'vue-router'
import CountryView from '../views/CountryView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: () => import('./../views/DashboardView')
  },
  {
    path: '/country',
    name: 'CountryView',
    component: CountryView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
