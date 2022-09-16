$(function () {
    let app = $('#app')
    let ul = $('ul')
    let olLi = $('ol li')
    let len = olLi.length
    let width = app.width()

    /* 动画
     * 默认没有效果，根据索引移动到当前图片 */
    let i = 0

    function slide(transition = 'none', transform = 0) {
        ul.css({
            transition,
            transform : `translateX(${ -width * i + transform }px)`,
        })
    }

    /* 自动播放下张图片 */
    let timer = setInterval(function () {
        ++i
        slide('all .3s')
    }, 2000)

    // 触屏起始位置
    let x = 0
    // 移动距离
    let moveX = 0
    // 判断是否移动
    let isMove = false
    ul.on({
        /* 左右拖动切换上下张图片
         *  -1(3) 0 1 2 3 4(0)
         * 4 -> 0 , -1 -> 3 */
        transitionend : function () {
            if (i === len) {
                i = 0
                slide()
            } else if (i === -1) {
                i = len - 1
                slide()
            }
            olLi.eq(i).addClass('cur')
                .siblings().removeClass('cur')
        },

        /* 记录开始位置
         * 清除定时器 */
        touchstart : function (e) {
            clearInterval(timer)
            x = e.targetTouches[0].pageX
        },

        /* 拖动图片移动，阻止默认滚动屏幕 */
        touchmove : function (e) {
            moveX = e.targetTouches[0].pageX - x
            slide(undefined, moveX)
            isMove = true
            e.preventDefault()
        },

        /* 发生移动
         * 移动距离大于 1/5 切换图片
         * 重启定时器 */
        touchend : function () {
            if (isMove) {
                if (moveX > width / 5) {
                    i--
                } else if (moveX < -width / 5) {
                    i++
                }
                slide('all .3s')
                clearInterval(timer)
                timer = setInterval(function () {
                    ++i
                    slide('all .3s')
                }, 2000)
            }
        },
    })
})