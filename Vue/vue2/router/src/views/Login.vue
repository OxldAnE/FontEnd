<template>
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="用户名">
      <input type="password" v-model="password" placeholder="密码">
      <button>提交</button>
    </form>
  </div>
</template>

<script>

export default {
  name   : 'Login',
  methods: {
    login () {
      localStorage.setItem('username', this.username)
      localStorage.setItem('password', this.password)
      this.$router.push('/')
    },
  },
  data () {
    return {
      username: '',
      password: '',
    }
  },
}
</script>

<style scoped>

</style>