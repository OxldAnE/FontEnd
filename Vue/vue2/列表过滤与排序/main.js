new Vue({
    el : '#root',
    data() {
        return {
            lists    : [
                { id : 1, name : '马冬梅', age : 18 },
                { id : 2, name : '周冬雨', age : 16 },
                { id : 3, name : '周杰伦', age : 17 },
                { id : 4, name : '温兆伦', age : 15 },
            ],
            keyWord  : '',
            sortType : 0,
        }
    },
    /* 先依据名字里是否含有关键字过滤
     * 再根据排序的值，进行相应排序 */
    computed : {
        res() {
            let arr = this.lists.filter(i =>
                i.name.includes(this.keyWord))

            if (this.sortType) {
                arr.sort((a, b) =>
                    this.sortType === 2
                    ? a.age - b.age
                    : b.age - a.age)
            }
            return arr
        },
    },
})