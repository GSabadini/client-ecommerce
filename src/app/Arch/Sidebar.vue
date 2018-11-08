<template lang="pug">
  #sidebar
    v-navigation-drawer(
      dark
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    )
      v-toolbar.elevation-0.logo.primary
        img(
          src="@/assets/logo.png"
          width="40sem"
          )
      v-list
        v-list-tile(
          ripple
          value="value"
          :to="homeRouter"
        )
          v-list-tile-action
            v-icon(
              color="white"
            ) home
          v-list-tile-content
            v-list-tile-title.sidebar-link.subheading Home
        v-list-tile(
          ripple
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        )
          v-list-tile-action
            v-icon(
              slot="activator"
              v-html="item.icon"
              color="white"
            )
          v-list-tile-content
            v-list-tile-title.sidebar-link.subheading(
              v-text="item.title"
            )
    toolbar(
      @mini-variant="toogleMiniVariant()"
      @drawer="toogleDrawer()"
      :miniVariant="miniVariant"
    )
</template>

<script>
import Toolbar from './Toolbar'
import routes from '@/router/routes'

export default {
  name: 'App',
  components: {
    Toolbar
  },
  data: () => ({
    clipped: false,
    drawer: false,
    miniVariant: false,
    homeRouter: '/'
  }),
  computed: {
    items () {
      const filterValids = route => route.meta && route.meta.sidebar && route.meta.sidebar.title

      return routes
        .filter(filterValids)
        .map(route => ({
          icon: route.meta.sidebar.icon,
          title: route.meta.sidebar.title,
          modulo: route.meta.modulo,
          path: route.path
        }))
    }
  },
  methods: {
    toogleMiniVariant () {
      this.miniVariant = !this.miniVariant
    },
    toogleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style lang="stylus">
#sidebar
  .logo
    display flex
    align-items center
    justify-content center

    .toolbar__content
      align-items center
      justify-content center

  .sidebar-link
    color white
</style>
