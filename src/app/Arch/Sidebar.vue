<template lang="pug">
  #sidebar
    v-navigation-drawer(
      light
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    )
      v-toolbar.elevation-0.logo
        img(
          src="@/assets/logo.png"
          width="40sem"
          )
      v-list
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
              color="black"
            )
          v-list-tile-content
            v-list-tile-title.text--black.sidebar-link.subheading(
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
    drawer: false,
    miniVariant: false
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
          path: route.props.route
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
    color black
</style>
