const vm = new Vue({
  el   : '#root',
  data : {
    numbers: {
      a: 0,
      b: 0
    }
  },
  watch: {
    numbers: {
      deep: true,
      handler (newValue, oldValue) {
        console.log(newValue.a, oldValue.a)
      }
    }
  }
})