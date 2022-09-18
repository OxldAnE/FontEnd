new Vue({
    el : '#root',
    data() {
        return {
            lists   : [
                { id : 1, name : '马冬梅', age : 18 },
                { id : 2, name : '周冬雨', age : 17 },
                { id : 3, name : '周杰伦', age : 16 },
                { id : 4, name : '温兆伦', age : 15 },
            ],
            keyWord : '',
            res     : [],
        }
    },
    watch : {
        keyWord : {
            immediate : true,
            handler(val) {
                this.res = this.lists.filter(i =>
                    i.name.includes(val),
                )
            },
        },
    },
})