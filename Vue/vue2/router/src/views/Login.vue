<template>
  <div>
    <form @submit.prevent="postData">
      <input type="text" placeholder="用户名">
      <input type="password" placeholder="密码">
      <button>提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name   : 'Login',
  methods: {
    postData () {

    },
  },
}
</script>

<style scoped>

</style>