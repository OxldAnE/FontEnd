new Vue({
    el : '#root',
    data() {
        return {
            // 在数组中挑一个样式使用
            colors : [ 'red', 'yellow', 'blue' ],
            color  : '',

            // 增删数组元素，改变样式
            border : [ 'border', 'border-radius' ],

            // 通过对象的属性值决定样式是否使用
            style : {
                red             : true,
                border          : true,
                'border-radius' : true,
            },
        }
    },
    methods : {
        changeColor() {
            this.color = this.colors[Math.floor(Math.random() * 3)]
        },
    },
})