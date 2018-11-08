import Http from '@/app/Arch/Http'

const uri = 'auth'

class LoginService {
  auth (payload) {
    return Http
      .post(uri, payload)
  }

  saveToken (token) {
    localStorage.setItem('Authorization', token)
  }

  getToken () {
    return localStorage.getItem('Authorization')
  }
}

const loginService = new LoginService()
export default loginService
