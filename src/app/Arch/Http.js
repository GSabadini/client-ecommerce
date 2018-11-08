import axios from 'axios'
import Router from '@/router'
import AuthService from '@/app/Auth/AuthService'

const unauthorizedCode = 401

const responseSucess = response => response

const responseError = ({ response }) => {
  if (response.status === unauthorizedCode) {
    Router.replace('/login')
  }
}

class Http {
  constructor () {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8081/api/'
    })
    axiosInstance.interceptors.request.use((config) => {
      const token = AuthService.getToken()
      if (token) {
        config.headers.Authorization = token
      }
      return config
    })

    axiosInstance
      .interceptors
      .response
      .use(responseSucess, responseError)

    return axiosInstance
  }
}

const axiosInstance = new Http()
export default axiosInstance
