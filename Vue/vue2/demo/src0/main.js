import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 组件能够访问属性和方法之前的 beforeCreate 添加总线
  // this 指向 Vue 实例
  // Vue 的原型在 组件 vm 的原型链上，使得组件能使用总线的方法
  beforeCreate () {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
