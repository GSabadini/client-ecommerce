<template lang="pug">
.content
  v-layout(row wrap)
    v-flex.props-title(xs12)
      label {{ title }}
    v-flex.props-value(xs12)
      label {{ item }}
</template>

<script>
export default {
  props: {
    title: String,
    item: [String, Number]
  }
}
</script>

<style lang="stylus">
.props-title
  color #8D8D8D
  font-size 12px
  padding-bottom 1px !important
.props-value
  font-size 16px
  padding-top 1px !important
</style>
