<template lang="pug">
  v-app(id="inspire")
    v-content
      v-container(fluid fill-height)
        v-layout(align-center justify-center)
          v-flex(xs12 sm8 md4)
            v-card.elevation-12
              v-toolbar(dark color="primary")
                v-toolbar-title Login
              v-card-text
                v-form
                  v-text-field(
                    prepend-icon="person"
                    name="email"
                    label="E-mail"
                    type="text"
                    v-model="user.email"
                    required
                    :rules="rules.email"
                  )
                  v-text-field(
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="user.password"
                    required
                    :rules="rules.password"
                  )
              v-card-actions
                v-spacer
                v-btn(
                  color="primary"
                  @click="auth()"
                  :disabled="isDataExist"
                ) Entrar
</template>

<script>
import { isEmpty } from 'lodash'
import AuthService from './AuthService'

export default {
  name: 'auth-form',
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    rules: {
      email: [
        v => !!v || 'Required field',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email invalid',
      ],
      password: [
        v => !!v || 'Required field',
      ],
    },
  }),
  computed: {
    isDataExist () {
      const { email, password } = this.user
      return isEmpty(email) || isEmpty(password)
    }
  },
  methods: {
    auth () {
      const { user } = this
      AuthService
        .auth(user)
        .then(({ data }) => {
          AuthService.saveUser(data.user)
          AuthService.saveToken(data.token)
          this.goPage()
        })
    },
    goPage () {
      this.$router.push('/')
    }
  }
}
</script>
