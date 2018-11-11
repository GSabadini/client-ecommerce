<template lang="pug">
  v-toolbar(
    light
    app
  )
    v-toolbar-side-icon(
      @click.stop="eventToogleDrawer()"
    )
    v-btn(
      icon
      @click.stop="eventToogleMiniVariant()"
    )
      v-icon(v-if="miniVariant") chevron_right
      v-icon(v-if="!miniVariant") chevron_left
    v-toolbar-title.headline {{ title }}
    v-spacer
    v-toolbar-items
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
    title: 'Vintage'
  }),
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
