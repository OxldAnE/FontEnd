$(function () {
    let big = $('.big')
    let mask = $('.mask')
    $('div:first-child').on({
        /* 鼠标进入
         * 显示大图和放大镜 */
        mouseenter : function () {
            big.css({ display : 'block' })
            mask.css({ display : 'block' })

            /* 鼠标移动
             * 放大镜随鼠标移动，但不出界
             * 大图按照比例反向移动 */
            $(this).mousemove(function (e) {
                let mouseX = e.pageX
                let mouseY = e.pageY
                let smallX = $(this).offset().left
                let smallY = $(this).offset().top
                let smallWidth = $(this).width()
                let smallHeight = $(this).height()
                let bigWidth = big.width()
                let bigHeight = big.height()
                let maskWidth = mask.width()
                let maskHeight = mask.height()

                // (0,0) 放大镜正好在小图左上角
                let x = mouseX - smallX - maskWidth / 2
                let y = mouseY - smallY - maskHeight / 2

                // 不出界
                if (x < 0) {
                    x = 0
                } else if (x > smallWidth - maskWidth) {
                    x = smallWidth - maskWidth
                }

                if (y < 0) {
                    y = 0
                } else if (y > smallHeight - maskHeight) {
                    y = smallHeight - maskHeight
                }
                mask.css({ left : `${ x }px`, top : `${ y }px` })
                big.css(
                    {
                        left : `${ -x * bigWidth / smallWidth }px`,
                        top  : `${ -y * bigHeight / smallHeight }px`,
                    })
            })
        },

        /* 鼠标离开
         隐藏大图和放大镜 */
        mouseleave : function () {
            big.css({ display : 'none' })
            mask.css({ display : 'none' })
        },
    })
})