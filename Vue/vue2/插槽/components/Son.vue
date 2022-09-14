<template>
  <div>
    <!-- 按照插槽的位置渲染 -->
    <slot name='header' />
    <slot name='footer' />
  </div>
</template>

<script>
export default {
  name : "Son",
}
</script>

<style scoped>

</style>