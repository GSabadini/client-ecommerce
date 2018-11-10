<template lang="pug">
  v-app(standalone)
    v-fade-transition(mode="out-in")
      router-view
</template>

<script>
export default {
  name: 'App',
}
</script>
