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
    v-btn(
      icon
      @click.stop="eventToogleClipped()"
    )
      v-icon web
    v-toolbar-title {{ title }}
    v-spacer
    v-tooltip(bottom)
      v-btn(
        slot="activator"
        right
        icon
        to="/login"
      )
        v-icon power_settings_new
      span SAIR
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    clipped: Boolean,
    miniVariant: Boolean,
    icone: String
  },
  data: () => ({
    title: 'Vue Arq'
  }),
  methods: {
    eventToogleMiniVariant () {
      this.$emit('mini-variant')
    },
    eventToogleClipped () {
      this.$emit('clipped')
    },
    eventToogleDrawer () {
      this.$emit('drawer')
    }
  }
}
</script>

<style lang="css">
</style>
