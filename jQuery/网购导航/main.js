$(function () {
    /* 挂载执行
     * 刷新页面检测导航栏 */
    nav()

    function nav() {
        if ($(document).scrollTop() >= $('main').offset().top) {
            $('nav').fadeIn()
        } else {
            $('nav').fadeOut()
        }
    }

    /* 滚动到主体内容显示导航栏
     * 相应的导航栏子项置为当前
     * 设置互斥锁
     * 连续将子项置为当前 */
    let flag = true
    $(window).scroll(function () {
        nav()
        if (flag) {
            $.each($('main section'), function (index, item) {
                if ($(document).scrollTop() >= $(item).offset().top) {
                    $('li').eq(index).addClass('cur').siblings().removeClass('cur')
                }
            })
        }
    })

    /* 点击导航栏的子项，滚动到页面处
     * 点击滚动，关闭锁，停止连续滚动
     * 动画结束，开锁 */
    $('li').click(function () {
        flag = false
        let cur = $('main section').eq($(this).index()).offset().top
        $(this).addClass('cur').siblings().removeClass('cur')
        $('body,html').stop().animate({
            scrollTop : cur,
        }, 'fast', function () {
            flag = true
        })
    })
})