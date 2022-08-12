const vm = new Vue({
  el     : '#root',
  data   : {
    userInfo: {
      account : '',
      password: '',
      age     : '',
      sex     : 'male',
      hobby   : [],
      region  : 'beijing',
      others  : '',
      agree   : '',
    },
  },
  methods: {
    demo () {
      console.log(JSON.stringify(this.userInfo))
    },
  },
})