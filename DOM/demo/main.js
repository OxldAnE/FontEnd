$(function () {
    $('button').on({
        click : function () {
            $(this).prop('disabled', true)
            let t = 3
            const timer = setInterval(() => {
                if (t) {
                    $(this).html(`还剩${ t-- }秒`)
                } else {
                    clearTimeout(timer)
                    $(this).prop('disabled', false).html('重新发送')
                }
            }, 1000)
        },
    })
})