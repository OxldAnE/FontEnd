new Vue({
    el : '#root',
    data() {
        return {
            n : 1,
        }
    },
    directives : {
        /* // 相当于绑定和模板更新
         fbind(element, binding) {
         element.value = binding.value
         } */

        fbind : {
            // 绑定
            bind(element, binding) {
                element.value = binding.value
            },

            // 插入
            inserted(element, binding) {
                element.focus()
            },

            // 模板更新
            update(element, binding) {
                element.value = binding.value
            },
        },
    },
})
/*
 // 注册为全局指令
 Vue.directive('fbind', function (element, binding) {
 element.value = binding.value
 })*/
