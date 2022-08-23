<template>
  <ul>
    <li v-for="list in result">{{ list.name }} {{ list.age }}</li>
  </ul>
</template>

<script>
export default {
  name : 'MyList',
  props: ['result'],
}
</script>

<style scoped>

</style>