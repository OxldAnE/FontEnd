<template>
  <ul>
    <transition-group appear name="animate__animated animated__bounce"
                      enter-active-class="animate__swing"
                      leave-active-class="animate__backOutUp">
      <MyItem v-for="todo in todos" :todo="todo" :key="todo.id" />
    </transition-group>

  </ul>
</template>

<script>
import 'animate.css'
import MyItem from '@/components/MyItem.vue'

export default {
  name      : 'MyList',
  components: {MyItem},
  props     : ['todos'],
}
</script>

<style scoped>
</style>