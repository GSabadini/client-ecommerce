<template lang="pug">
  v-toolbar(
    light
    app
  )
    v-toolbar-side-icon(
      v-if="userIsLogged"
      @click.stop="eventToogleDrawer()"
    )
    v-btn(
      v-if="userIsLogged"
      icon
      @click.stop="eventToogleMiniVariant()"
    )
      v-icon(v-if="miniVariant") chevron_right
      v-icon(v-if="!miniVariant") chevron_left
    v-toolbar-title.headline {{ title }}
    v-toolbar-items.ml-3(v-if="!userIsLogged")
      v-btn(flat) For man
      v-btn(flat) For Woman
      v-btn(flat) Others
    v-spacer
    v-toolbar-items(v-if="!userIsLogged")
      v-btn(icon)
         v-icon search
      v-btn(icon)
        v-icon shopping_cart
      v-btn(@click="goToAuth()" flat) Admin Area
    v-toolbar-items(v-if="userIsLogged")
      v-icon.mr-3(medium color="black") account_circle
      v-btn(
        right
        flat
        @click="logout()"
      ) Sign out
</template>

<script>
import AuthService from '@/app/Auth/Service'

export default {
  name: 'Toolbar',
  props: {
    miniVariant: Boolean,
    icone: String
  },
  data: () => ({
    searchTerm: '',
    title: 'Vintage'
  }),
  computed: {
    userIsLogged () {
      const token = AuthService.getToken()
      console.log(!!token)
      return !!token
    }
  },
  methods: {
    logout () {
      AuthService.logout()
      this.goToAuth()
    },
    goToAuth () {
      this
        .$router
        .push('/')
    },
    eventToogleMiniVariant () {
      this.$emit('mini-variant')
    },
    eventToogleDrawer () {
      this.$emit('drawer')
    }
  }
}
</script>

<style lang="stylus">
.title
  display flex
  justify-content space-between
  width 100%
</style>
