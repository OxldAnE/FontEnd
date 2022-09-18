<template>
  <div>
    <!-- 点击触发方法 h -->
    <!-- h 触发父组件的 E 并将 a 传递 -->
    <button @click='h'>a</button>
  </div>
</template>

<script>
export default {
  name : "Son",
  data () {
    return {
      a : 1,
    }
  },
  methods : {
    h (a) {
      this.$emit('E', this.a)
    },
  },
}
</script>

<style scoped>

</style>