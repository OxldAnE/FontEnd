new Vue({
    el : '#root',
    data() {
        return {
            opacity : 1,
        }
    },

    // 挂载时启动定时器
    mounted() {
        this.timer = setInterval(() => {
            if (this.opacity <= 0) {
                this.opacity = 1
            }
            this.opacity -= 0.1
        }, 100)
    },

    methods : {
        // 手动销毁，调用 beforeDestroy
        stop() {
            this.$destroy()
        },
    },
    
    beforeDestroy() {
        clearInterval(this.timer)
    },
})
