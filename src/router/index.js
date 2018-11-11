import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Layout from '@/app/Arch/Layout'
import AuthForm from '@/app/Auth/Form'
// import Toolbar from '@/app/Arch/Toolbar'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/backoffice',
      name: 'layout',
      component: Layout,
      children: routes
    },
    {
      path: '/',
      name: 'auth',
      component: AuthForm
    }
  ]
})

export default router
