<template lang="pug">
  v-toolbar(
    light
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
    v-icon.mr-3(medium color="black") account_circle
    v-btn(
      right
      flat
      @click="logout()"
    ) Sign out
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
