<template lang="pug">
  v-app(id="inspire")
    v-content
      v-container(fluid fill-height)
        v-layout(align-center justify-center)
          v-flex(xs12 sm8 md4)
            v-card
              v-toolbar(dark color="primary")
                v-toolbar-title Vintage Admin
                  v-icon.ml-2 settings
              v-card-text
                v-form(
                  ref="form"
                  v-model="formValid"
                  )
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
                v-btn Sign Up
                v-btn(
                  color="primary"
                  @click="auth()"
                ) Sign In
</template>

<script>
import { isEmpty } from 'lodash'
import AuthService from './AuthService'

export default {
  name: 'auth-form',
  data: () => ({
    formValid: false,
    user: {
      email: '',
      password: ''
    },
    rules: {
      email: [
        v => !!v || 'Required field',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email invalid'
      ],
      password: [
        v => !!v || 'Required field'
      ]
    }
  }),
  computed: {
    isFormValid () {
      return !this.formValid
    }
  },
  methods: {
    auth () {
      const { user } = this

      if (!this.formValid) return

      AuthService
        .auth(user)
        .then(({ data }) => {
          AuthService.saveUser(data.user)
          AuthService.saveToken(data.token)
          this.goPage()
        })
        .catch(response => {
          console.error('Invalid credencials')
        })
    },
    goPage () {
      this.$router.push('/backoffice')
    }
  }
}
</script>
