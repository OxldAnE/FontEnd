$(function () {
  /* 输入框内容改变
   * 更新总价 */
  $('.number').change(function () {
    let price = $(this).parent().siblings('.price').html().substring(2)
    let num = $(this).val()
    $(this).parent().siblings('.sum').html(`¥ ${ (price * num).toFixed(2) }`)
    let sum = 0
    $.each($('.sum'), function (index, item) {
      sum += parseFloat($(item).html().substring(2))
    })
    $('.final').html(`¥ ${ sum.toFixed(2) }`)
  })
  $('.number').change()

  /* 自减
   * 触发改变事件 */
  $('.decrement').click(function () {
    let val = $(this).siblings('.number').val()
    // val 是字符串
    if (val == 1) {
      return false
    }
    $(this).siblings('.number').val(--val)
    $(this).siblings('.number').change()
  })

  /* 自增 */
  $('.increment').click(function () {
    let val = $(this).siblings('.number').val()
    $(this).siblings('.number').val(++val)
    $(this).siblings('.number').change()
  })

  /* 全选勾选 */
  $('.all').change(function () {
    $('.item').prop('checked', $(this).prop('checked'))
  })

  /* 子项勾选
   * 子项勾选个数等于总个数 */
  $('.item').change(function () {
    $('.all').prop(
      'checked',
      $('.item:checked').length === $('.item').length)
  })

  /* 删除子项 */
  $('.del').click(function () {
    $(this).parents('tr').remove()
    none()
  })

  /* 删除已勾选
   * 已勾选，点击删除按钮
   * 更新最后价钱 */
  $('.delChecked').click(function () {
    $.each($('.del'), function (index, item) {
      if ($(item).parents('tr').find('.item').prop('checked')) {
        $(item).parents('tr').find('.del').click()
      }
    })
    $('.number').change()
    none()
  })
})

/* 没有子项，隐藏结算栏 */
function none () {
  if (!$('.number').length) {
    $('.account').hide()
    $('.all').prop('checked', false)
  }
}