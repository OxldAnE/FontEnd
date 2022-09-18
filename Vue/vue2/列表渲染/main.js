new Vue({
    el : '#root',
    data() {
        return {
            arr : [ 1, 2, 3 ],
        }
    },
    methods : {
        prepend() {
            this.arr.unshift(0)
        },
    },
})