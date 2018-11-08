import LoginService from '@/app/Auth/LoginService'
import { isEmpty } from 'lodash'

export default {
  state: {
    user: {},
    token: ''
  },
  getters: {
    isLogged: ({ token }) => !isEmpty(token),
    teste: (state) => state
  },
  mutations: {
  },
  actions: {
  },
  namespaced: true
}
