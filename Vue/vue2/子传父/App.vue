<template>
  <div id='app'>
    <!-- 事件 e 触发方法 H -->
    <!-- H 接收子组件传递的数据 a 赋值给 A -->
    <Son @E='H' />
    {{ A }}
  </div>
</template>

<script>
import Son from '@/components/Son.vue'

export default {
  name       : 'App',
  components : {Son},
  data () {
    return {
      A : undefined,
    }
  },
  methods : {
    H (a) {
      this.A = a
    },
  },
}
</script>

<style>

</style>