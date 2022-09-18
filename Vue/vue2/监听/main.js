new Vue({
    el : '#root',
    data() {
        return {
            c   : {
                a : '',
                b : '',
            },
            a_b : '',
        }
    },
    watch : {
        c : {
            immediate : true,
            deep      : true,
            handler(newVal) {
                setTimeout(() => {
                    this.a_b = newVal.a + ' ' + newVal.b
                }, 1000)
            },
        },
    },
})