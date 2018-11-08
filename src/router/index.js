import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Layout from '@/app/Arch/Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: routes
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/app/Auth/LoginForm')
    }
  ]
})
