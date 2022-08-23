<template>
  <li>
    <input type="checkbox"
           :checked="todo.done"
           @change="isDone(todo.id)"
           :id="todo.id">
    <!--编辑状态下，隐藏显示文本和编辑按钮-->
    <label :for="todo.id" v-show="!todo.isEdit">{{ todo.title }}</label>
    <input type="text"
           :value="todo.title"
           v-show="todo.isEdit"
           @blur="todoBlur(todo,$event)" ref="inputValue">
    <button class="edit" @click="editTodo(todo)" v-show="!todo.isEdit">编辑
    </button>
    <!--悬浮时，显示删除按钮-->
    <button class="delete" @click="deleteTodo(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name   : 'MyItem',
  props  : ['todo'],
  methods: {
    isDone (todoId) {
      this.$bus.$emit('isDone', todoId)
    },
    deleteTodo (todoId) {
      this.$bus.$emit('deleteTodo', todoId)
    },
    editTodo (todo) {
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      }
      else {
        this.$set(todo, 'isEdit', true)
      }
      this.$nextTick(() => this.$refs.inputValue.focus())
    },
    todoBlur (todo, e) {
      todo.isEdit = false
      if (!e.target.value.trim()) {
        return
      }
      this.$bus.$emit('updateTodo', todo.id, e.target.value)
    },
  },
}
</script>

<style scoped>
li {
  margin-top: 0.5em;
}

.edit {
  position: absolute;
  right: 5em;
  background-color: darkseagreen;
  border-radius: 1em;
}

.delete {
  position: absolute;
  right: 0.5em;
  background-color: orangered;
  border-radius: 1em;
  display: none;
}

li:hover {
  background-color: #ccc;
}

li:hover .delete {
  display: inline-block;
}
</style>