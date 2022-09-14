<template>
  <div>
    {{ state.a }}
    <button @click='One'>1</button>
  </div>
</template>

<script>
import store from '@/store.js'

export default {
  name : "One",
  data () {
    return {
      state : store.state,
    }
  },
  methods : {
    One () {
      store.seta(1)
    },
  },
}
</script>

<style scoped>

</style>