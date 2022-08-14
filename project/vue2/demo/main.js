const vm = new Vue({
  el        : '#app',
  data      : {
    n: 1,
  },
  directives: {
    big (element, binding) {
      element.innerText = binding.value * 10
    },
  },
})
