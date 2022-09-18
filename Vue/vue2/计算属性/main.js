new Vue({
    el : '#root',
    data() {
        return {
            a : '',
            b : '',
        }
    },
    computed : {
        c : {
            get() {
                return this.b ? this.a + ' ' + this.b : this.a
            },
            set(v) {
                const arr = v.split(' ')
                this.a = arr[0]
                this.b = arr[1] ?? ''
            },
        },
    },
})