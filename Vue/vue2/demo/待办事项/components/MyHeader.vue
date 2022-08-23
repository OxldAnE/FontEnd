<template>
  <div>
    <input type="text" v-model="title"
           placeholder="请输入待办事项，回车提交"
           @keyup.enter="addTodo">
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
  name   : 'MyHeader',
  methods: {
    addTodo () {
      if (!this.title.trim()) {
        alert('输入内容不能为空')
        return
      }
      const newTodo = {
        id: nanoid(), title: this.title, done: false,
      }
      this.$emit('addTodo', newTodo)
      this.title = ''
    },
  },
  data () {
    return {
      title: '',
    }
  },
}
</script>

<style scoped>
input {
  width: 100%;
}
</style>