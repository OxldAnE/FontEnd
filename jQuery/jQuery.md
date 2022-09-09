# `jQuery`

## 元素

|          描述          |                        示例                         |
| :--------------------: | :-------------------------------------------------: |
|       获取父元素       |                     `parent()`                      |
|      获取祖先元素      |                  `parents('div')`                   |
|     获取所有子元素     |                    `children()`                     |
|  在元素里获取后代元素  |                    `find('li')`                     |
|    获取所有兄弟元素    |                    `siblings()`                     |
| 添加到元素内部的最后面 |                     `append()`                      |
| 添加到元素内部的最前面 |                     `prepend()`                     |
|    添加到元素的后面    |                      `after()`                      |
|    添加到元素的前面    |                     `before()`                      |
|        删除元素        |                     `remove()`                      |
|       清空子元素       |                      `empty()`                      |
|   获取指定索引的元素   |                       `eq(0)`                       |
|     遍历 `jq`对象      | `$('li').each(function(index,item){$(item).css()})` |
|    可遍历数组和对象    |       ``$.each(arr,function(index,item){})``        |
|        对象拷贝        |              `$.extend(true,tgt,src)`               |

```js
let arr = ['red', 'blue']
```

```js
/* 遍历 `jq`对象得到 DOM 对象 */
$('li').each(function (index, item) {$(item).css('color', arr[index])})
```

```js
/* 两者等价 */
$.each($('li'), function (index, item) {
  $(item).css('color', arr[index])
})
```

```js
/* 可遍历数组和对象 */
$.each(arr, function (index, item) {
  console.log(item)
})
```

## 属性

|            描述             |             示例             |
| :-------------------------: | :--------------------------: |
|        设置单个样式         |    `css('width','10em')`     |
|        设置多个样式         |     `css({width:10em})`      |
|     设置内置属性(对象)      |       `prop('value')`        |
|    设置自定义属性(页面)     |       `attr('index')`        |
|          设置变量           |       `data('index')`        |
|          获取索引           |      `$(this).index()`       |
|        设置元素内容         |           `html()`           |
|        设置元素文本         |           `text()`           |
|     获取表单值(字符串)      |           `val()`            |
|     判断元素是否包含类      |      `hasClass('cur')`       |
|           添加类            |      `addClass('cur')`       |
|           移除类            |     `removeClass('cur')`     |
|           切换类            |     `toggleClass('cur')`     |
|          内容宽度           |          `wideth()`          |
|       内容+内边距宽度       |       `innerWideth()`        |
|    内容+内边距+边框宽度     |       `outerWideth()`        |
| 内容+内边距+边框+外边距宽度 |     `outerWideth(true)`      |
|      设置相对文档位置       |          `offset()`          |
|  获取相对有定位的祖先元素   |         `position()`         |
|       设置滚动条距离        | `scrollTop()`/`scrollLeft()` |

## 动画

|     描述     |      示例       |
| :----------: | :-------------: |
|     动画     |   `animate()`   |
|   停止动画   |    `stop()`     |
|     显示     |    `show()`     |
|     隐藏     |    `hide()`     |
|     切换     |   `toggle()`    |
|     上拉     |   `slideUp()`   |
|     下拉     |  `slideDown()`  |
|   切换滑动   | `slideToggle()` |
|     淡入     |   `fadeIn()`    |
|     淡出     |   `fadeOut()`   |
| 淡入淡出切换 | `fadeToggle()`  |

## 事件

|            描述            |         示例         |
| :------------------------: | :------------------: |
|        绑定多个事件        |        `on()`        |
|          解绑事件          |       `off()`        |
|       只触发一次事件       |       `one()`        |
|        自动触发事件        |     `trigger()`      |
| 自动触发事件不触发默认行为 |  `triggerHandler()`  |
|            点击            |      `click()`       |
|       鼠标进入(冒泡)       |    `mouseover()`     |
|       鼠标离开(冒泡)       |     `mouseout()`     |
|          鼠标进入          |    `mouseenter()`    |
|          鼠标离开          |    `mouseleave()`    |
|          鼠标切换          | `hover(enter,leave)` |
|            改变            |      `change()`      |
|                            |                      |

```js
/* 相同的处理函数 */
$('div').on('mouseenter click', function () {
  $(this).toggleClass('cur')
})
```

```js
/* 对象写法 */
$('div').on({
  mouseenter : function () {
    $(this).toggleClass('cur')
  },
  click      : function () {
    $(this).toggleClass('cur')
  },
})
```

```js
/* 事件委托并且动态绑定 */
$('ul').on('click', 'li', function () {})
```

## 示例

### [网购结算](网购结算/index.html)

```js
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
```

### [网购导航](网购导航/index.html)

```js
$(function () {
  /* 挂载执行
   * 刷新页面检测导航栏 */
  nav()

  function nav () {
    if ($(document).scrollTop() >= $('main').offset().top) {
      $('nav').fadeIn()
    }
    else {
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
```

