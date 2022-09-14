<template>
  <div>
    {{ state.a }}
    <button @click='Two'>2</button>
  </div>
</template>

<script>
import store from '@/store.js'

export default {
  name : "Two",
  data () {
    return {
      state : store.state,
    }
  },
  methods : {
    Two () {
      store.seta(2)
    },
  },
}
</script>

<style scoped>

</style>