<template>
  <div id='app'>
    <One />
    <Two />
  </div>
</template>

<script>

import One from '@/components/One.vue'
import Two from '@/components/Two.vue'

export default {
  name       : 'App',
  components : {Two, One},
}
</script>

<style>

</style>