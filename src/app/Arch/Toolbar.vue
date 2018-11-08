<template lang="pug">
  v-toolbar(
    dark
    app
    :clipped-left="clipped"
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
    v-toolbar-title {{ title }}
    v-spacer
    v-tooltip(bottom)
      v-btn(
        slot="activator"
        right
        icon
        @click="logout()"
      )
        v-icon power_settings_new
      span EXIT
</template>

<script>
import AuthService from '@/app/Auth/AuthService'

export default {
  name: 'Toolbar',
  props: {
    clipped: Boolean,
    miniVariant: Boolean,
    icone: String
  },
  data: () => ({
    title: 'Vintage'
  }),
  methods: {
    logout () {
      AuthService.logout()
      this
        .$router
        .push('/auth')
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

<style lang="css">
</style>
