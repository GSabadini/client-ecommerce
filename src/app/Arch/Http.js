import axios from 'axios'
import Router from '@/router'
import AuthService from '@/app/Auth/Service'
import miniToastr from 'mini-toastr'

const unauthorizedCode = 401

const responseSucess = response => response

const responseError = ({ response }) => {
  if (response.status === unauthorizedCode) {
    miniToastr.error('Invalid credentials', 'Error!')
    Router.replace('/auth')
  }
}

class Http {
  constructor () {
    miniToastr.init()
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8081/api/',
      headers: { 'Accept': 'application/json' }
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
