new Vue({
    el : '#root',
    data() {
        return {
            arr : [ 1, 2 ],
        }
    },
    methods : {
        zero(i) {
            // Vue.set(this.arr, i, 0)
            this.arr.splice(i, 1, 0)
        },
    },
})