import slide from '../slide.js'

$(function () {
    let app = $('#app')
    let ul = $('ul')
    let lr = $('div img')
    let olLi = $('ol li')
    let len = olLi.length
    let width = app.width()
    // 互斥锁
    let flag = true

    /* 排他 */
    function cur(i) {
        olLi.eq(i).addClass('cur')
            .siblings().removeClass('cur')
    }

    /* 点击底部圆圈，切换到指定图片 */
    olLi.click(function () {
        if (flag) {
            flag = false
            cur($(this).index())
            slide(ul, -width * $(this).index(), function () {
                flag = true
            })
        }
    })

    /* 点击左右按钮切换上下张图片
     *  0 1 2 3 4(0)
     * 4 -> 0 , 0 -> 4 */
    let i = 0
    lr.click(function () {
        if (flag) {
            flag = false
            // 右 = 1 , 左 = 0
            let isR = $(this).index()
            // r : 向右拉上一张图片，且已经是第一张，传送到最后一张
            // l : 向左拉下一张图片，且已经是最后一张，传送到第一张
            if (isR && i === 0) {
                i = len
            } else if (!isR && i === len) {
                i = 0
            }
            ul.offset({ left : -width * i })

            // 向右拉上一张，向左拉下一张
            if (isR) {
                --i
            } else {
                ++i
            }
            cur(i % len)
            slide(ul, -width * i, function () {
                flag = true
            })
        }
    })

    /* 自动播放下张图片 */
    let timer = setInterval(function () {
        lr.eq(0).click()
    }, 2000)

    /* 鼠标进入和离开，显示和隐藏上下按钮
     * 停止自动播放 */
    app.hover(function () {
        lr.show()
        clearInterval(timer)
    }, function () {
        lr.hide()
        timer = setInterval(function () {
            lr.eq(0).click()
        }, 2000)
    })
})
