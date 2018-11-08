<template lang="pug">
  #layout
    sidebar
    v-content
      v-container(fluid)
        v-slide-y-transition(mode="out-in")
          router-view
</template>

<script>
import Sidebar from './Sidebar'

export default {
  name: 'Layout',
  components: {
    Sidebar
  }
}
</script>
