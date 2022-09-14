<template>
  <div id='app'>
    <!-- 父组件的 A 流向子组件的 a -->
    <Son :a='A' />
  </div>
</template>

<script>
import Son from '@/components/Son.vue'

export default {
  name       : 'App',
  components : {Son},
  data () {
    return {
      A : 1,
    }
  },
}
</script>

<style>

</style>