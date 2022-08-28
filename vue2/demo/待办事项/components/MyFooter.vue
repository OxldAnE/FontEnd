<template>
  <div v-if="all">
    <input type="checkbox" v-model="allIsDone" id="checkbox">
    <label for="checkbox">已完成 {{ hasDone }} 件 / 共 {{ all }} 件</label>
    <button @click="clearHasDone">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name    : 'MyFooter',
  props   : ['todos'],
  computed: {
    hasDone () {
      return this.todos.reduce((count, todo) => todo.done
                                                ? count + 1
                                                : count, 0)
    },
    all () {
      return this.todos.length
    },
    allIsDone: {
      get () {
        // 已完成事项数 === 总事项数
        return this.hasDone === this.all
        // 每个事项都完成
        // return this.todos.every(todo => todo.done)
      },
      // 手动勾选交于父组件处理
      set (value) {
        this.$emit('allIsDone', value)
      },
    },
  },
  methods : {
    clearHasDone () {
      this.$emit('clearHasDone')
    },
  },
}
</script>

<style scoped>
button {
  position: absolute;
  right: 1em;
  background-color: orangered;
  border-radius: 1em;
}
</style>