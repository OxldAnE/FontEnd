<!-- 前端页面 -->
<template>
  <div id='app'>
    <form @submit.prevent='postData'>
      <input v-model='str' />
      <button>提交</button>
    </form>
    <ul>
      <li v-for='(item,index) of arr'>
        {{ item }}
        <button @click='deleteData'>删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name    : 'App',
  methods : {
    /* 读取数据 */
    getData () {
      axios.get('http://127.0.0.1:8080').then((res) => {
        this.arr = res.data
      })
    },

    /* 提交数据 */
    postData () {
      axios.post('http://127.0.0.1:8080', {str : this.str}).then(() => {
        this.getData()
      })
    },

    /* 删除数据 */
    deleteData (index) {
      axios.delete(`http://127.0.0.1:8080/${ index }`).then(() => {
        this.getData()
      })
    },
  },
  data () {
    return {
      str : '',
      arr : [],
    }
  },
  created () {
    this.getData()
  },
}
</script>

<style>

</style>