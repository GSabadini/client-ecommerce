<template lang="pug">
  .crud-forge
    v-slide-y-transition(mode="out-in")
      router-view(:onLoad="getData")
</template>

<script>
export default {
  props: {
    route: String,
    title: String,
    subtitle: String
  },
  data: () => ({
    actions: {},
    loading: true,
    items: []
  }),
  methods: {
    getData (response) {
      this.loading = false
    }
  },
  watch: {
    route () {
      this.loading = true
      this.getData()
    }
  }
}
</script>

<style lang="stylus">
.crud-forge
  @media (max-width: 599px)
    .container
      padding 8px

  .max-height-50
    max-height 100px
</style>
