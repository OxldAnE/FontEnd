<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    |
    <router-link to="/login">登录</router-link>
    <span v-if="username">
      || 欢迎：{{ username }}
      <button @click="logout">注销</button>
    </span>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      username: '',
    }
  },
  watch  : {
    '$route.path' () {
      this.username = localStorage.getItem('username')
    },
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    },
  },

}
</script>
<style>

</style>
