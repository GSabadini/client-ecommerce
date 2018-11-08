import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Layout from '@/app/Arch/Layout'
import AuthForm from '@/app/Auth/AuthForm'
import AuthService from '@/app/Auth/AuthService'

Vue.use(Router)

const router = new Router({
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

router.beforeEach((to, from, next) => {
  const token = AuthService.getToken()

  if (!token && to.name !== 'auth') {
    return next('/auth')
  }

  if (token && to.name === 'auth') {
    return next('/')
  }

  return next()
})

export default router
