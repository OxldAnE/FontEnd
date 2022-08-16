<template>
  <div>
    <input type="text" placeholder="请输入关键词" v-model="keyWord">
    <button @click="order=2">升序</button>
    <button @click="order=1">降序</button>
    <button @click="order=0">原序</button>
    <MyList :result="result"/>
  </div>
</template>

<script>
import MyList from '@/components/MyList.vue'

export default {
  name      : 'MySearch',
  components: {MyList},
  data () {
    return {
      // watch 打开
      // result : [],
      keyWord: '',
      order  : 0,
    }
  },
  props   : ['lists'],
  computed: {
    result () {
      const arr = this.lists.filter(
          item => item.name.indexOf(this.keyWord) !== -1)
      if (this.order) {
        arr.sort((a, b) => {
          return this.order === 1
                 ? a.age - b.age
                 : b.age - a.age
        })
      }
      return arr
    },
  },
  // watch   : {
  //   keyWord: {
  //     immediate: true,
  //     handler () {
  //       this.result =
  //           this.lists.filter(item => item.name.indexOf(this.keyWord) !== -1)
  //     },
  //   },
  //   order () {
  //     if (this.order) {
  //       this.result.sort((a, b) => this.order === 1
  //                                  ? a.age - b.age
  //                                  : b.age - a.age)
  //     }
  //   },
  //
  // },
}
</script>

<style scoped>

</style>