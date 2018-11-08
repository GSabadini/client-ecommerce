<template lang="pug">
  v-app(id="inspire")
    v-content
      v-container(fluid fill-height)
        v-layout(align-center justify-center)
          v-flex(xs12 sm8 md4)
            v-card.elevation-12
              v-toolbar(dark color="primary")
                v-toolbar-title Login form
              v-card-text
                v-form
                  v-text-field(
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="user.login"
                  )
                  v-text-field(
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="user.password"
                  )
              v-card-actions
                v-spacer
                v-btn(
                  color="primary"
                  @click="goPage()"
                  :disabled="isDadosExist"
                ) Entrar
</template>

<script>
import { isEmpty } from 'lodash'

export default {
  name: 'Login',
  data: () => ({
    user: {
      login: '',
      password: ''
    }
  }),
  computed: {
    isDadosExist () {
      const { login, password } = this.user
      return isEmpty(login) || isEmpty(password)
    }
  },
  methods: {
    goPage () {
      this.$router.push('/')
    }
  }
}
</script>
