import Http from '@/app/Arch/Http'

const uri = 'auth'

class LoginService {
  auth (payload) {
    return Http
      .post(uri, payload)
  }

  saveToken (token) {
    localStorage.setItem('authorization', `Bearer ${token}`)
  }

  saveUser (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getToken () {
    return localStorage.getItem('authorization')
  }

  logout () {
    localStorage.clear()
  }
}

const loginService = new LoginService()
export default loginService
