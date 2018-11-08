import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Layout from '@/app/Arch/Layout'
import AuthForm from '@/app/Auth/AuthForm'

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
      path: '/auth',
      name: 'auth',
      component: AuthForm
    }
  ]
})
