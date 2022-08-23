<template>
  <div id="app">
    <MyHeader @addTodo="addTodo" />
    <MyList :todos="todos" />
    <MyFooter :todos="todos"
              @allIsDone="allIsDone"
              @clearHasDone="clearHasDone" />
  </div>
</template>

<script>

import MyHeader from '@/components/MyHeader.vue'
import MyList from '@/components/MyList.vue'
import MyFooter from '@/components/MyFooter.vue'

export default {
  name      : 'App',
  components: {MyFooter, MyList, MyHeader},
  data () {
    return {
      // 读取本地存储，为 null 时初始化为 []
      todos: JSON.parse(localStorage.getItem('todos')) || [],
    }
  },
  methods: {
    // 头部的添加功能
    addTodo (todo) {
      this.todos.unshift(todo)
    },
    // 注册总线的表项勾选功能
    isDone (todoId) {
      this.todos.forEach(todo => {
        if (todo.id === todoId) {
          todo.done = !todo.done
        }
      })
    },
    // 底部的全选或取消全选功能
    allIsDone (value) {
      this.todos.forEach(todo => todo.done = value)
    },
    // 注册总线的表项删除功能
    deleteTodo (todoId) {
      if (confirm('确认要删除吗')) {
        this.todos = this.todos.filter(todo => todo.id !== todoId)
      }
    },
    // 底部的清除已完成功能
    clearHasDone () {
      if (confirm('确认要清除所有已完成任务吗')) {
        this.todos = this.todos.filter(todo => !todo.done)
      }
    },
    // 注册总线的表项更新功能
    updateTodo (todoId, value) {
      this.todos.forEach(todo => {
        if (todo.id === todoId) {
          todo.title = value
        }
      })
    },
  },
  // 侦听待办事项，更新本地存储
  watch: {
    todos: {
      deep: true,
      handler (value) {
        localStorage.setItem('todos', JSON.stringify(value))
      },
    },
  },
  // 挂载时，注册自定义事件到总线
  mounted () {
    this.$bus.$on('isDone', this.isDone)
    this.$bus.$on('deleteTodo', this.deleteTodo)
    this.$bus.$on('updateTodo', this.updateTodo)
  },
  // 销毁前，销毁自定义事件
  beforeDestroy () {
    this.$bus.$off('isDone')
    this.$bus.$off('deleteTodo')
    this.$bus.$off('updateTodo')
  },
}
</script>

<style>
#app {
  width: 30em;
  margin: 0 auto;
  position: relative;
}

label:hover {
  cursor: pointer;
}

button:hover {
  cursor: pointer;
}
</style>
