# `jQuery`

## 元素

|         描述         |       示例       |
| :------------------: | :--------------: |
|      获取父元素      |    `parent()`    |
|     获取祖先元素     | `parents('div')` |
|    获取所有子元素    |   `children()`   |
| 在元素里获取后代元素 |   `find('li')`   |
|   获取所有兄弟元素   |   `siblings()`   |
|  获取指定索引的元素  |     `eq(0)`      |

## 属性

|        描述        |         示例          |
| :----------------: | :-------------------: |
|    设置单个样式    | `css('width','10em')` |
|    设置多个样式    |  `css({width:10em})`  |
|    设置内置属性    |    `prop('value')`    |
|      设置属性      |    `attr('index')`    |
|      设置变量      |    `data('index')`    |
|      获取索引      |   `$(this).index()`   |
|    设置元素内容    |       `html()`        |
|    设置元素文本    |       `text()`        |
|     获取表单值     |        `val()`        |
|        动画        |      `animate()`      |
|      停止动画      |       `stop()`        |
| 判断元素是否包含类 |   `hasClass('cur')`   |
|       添加类       |   `addClass('cur')`   |
|       移除类       | `removeClass('cur')`  |
|       切换类       | `toggleClass('cur')`  |
|        显示        |       `show()`        |
|        隐藏        |       `hide()`        |
|        切换        |      `toggle()`       |
|        上拉        |      `slideUp()`      |
|        下拉        |     `slideDown()`     |
|      切换滑动      |    `slideToggle()`    |
|        淡入        |      `fadeIn()`       |
|        淡出        |      `fadeOut()`      |
|    淡入淡出切换    |    `fadeToggle()`     |

## 事件

|      描述      |         示例         |
| :------------: | :------------------: |
|      点击      |      `click()`       |
| 鼠标进入(冒泡) |    `mouseover()`     |
| 鼠标离开(冒泡) |     `mouseout()`     |
|    鼠标进入    |    `mouseenter()`    |
|    鼠标离开    |    `mouseleave()`    |
|    鼠标切换    | `hover(enter,leave)` |
|      改变      |      `change()`      |

## 示例

### [全选框](全选框.html)

```js
/* 全选框改变，将所有子项设置成一样
 * 子项改变，如果被选中子项个数等于全部子项个数，全选框选中 */
$(function () {
  $('.all').change(function () {
    $('.item').prop('checked', $(this).prop('checked'))
  })
  $('.item').change(function () {
    $('.all').prop(
      'checked',
      $('.item:checked').length === $('.item').length)
  })
})
```

### [购物结算](购物结算.html)

```js
$(function () {
  /* 输入框内容改变
   * 更新总价 */
  $('input').change(function () {
    let price = $(this).parent().siblings('.price').html().substring(1)
    let num = $(this).val()
    $(this).parent().siblings('.sum').html(`¥${ (price * num).toFixed(2) }`)
  })

  /* 自减
   * 触发改变事件 */
  $('.decrement').click(function () {
    let val = $(this).siblings('input').val()
    // val 是字符串
    if (val == 1) {
      return false
    }
    $(this).siblings('input').val(--val)
    $(this).siblings('input').change()
  })

  /* 自增 */
  $('.increment').click(function () {
    let val = $(this).siblings('input').val()
    $(this).siblings('input').val(++val)
    $(this).siblings('input').change()
  })
})
```

