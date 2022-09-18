# DOM

## 元素

|     描述      |             示例              |
|:-----------:|:---------------------------:|
|   获取单个元素    |  document.querySelector()   |
|   获取全部元素    | document.querySelectorAll() |
|    获取父节点    |         parentNode          |
|   获取所有子元素   |          children           |
|    创建元素     |  document.createElement()   |
| 添加子节点到父节点末尾 |        appendChild()        |
| 在指定节点前插入子节点 |       insertBefore()        |
|    删除节点     |          remove()           |
|    删除子节点    |        removeChild()        |
|    深拷贝节点    |       cloneNode(true)       |

## 属性

|         描述         |        示例         |
|:------------------:|:-----------------:|
|      获取节点的内容       |     innerHTML     |
|       设置内联样式       |       style       |
|       获取属性值        |  getAttribute()   |
|       设置属性值        |  setAttribute()   |
|        移除属性        | removeAttribute() |
|        内容高度        |   style.height    |
|     内容高度 + 内边距     |   clientHeight    |
| 内容高度 + 内边距 + 滚动条距离 |   scrollHeight    |
|  内容高度 + 内边距 + 边框   |   offsetHeight    |
|       滚动条距离        |     scrollTop     |
|       定位的上距离       |     offsetTop     |

## 事件

![image-20220904223927048](assets/image-20220904223927048.png)

|  描述  |          示例           |
|:----:|:---------------------:|
| 添加事件 |  addEventListener()   |
| 删除事件 | removeEventListener() |

### 事件类型

|     描述      |     示例     |
|:-----------:|:----------:|
|    加载完成     |    load    |
|   窗口改变大小    |   resize   |
|    滚动条滚动    |   scroll   |
|    获得焦点     |   focus    |
|    失去焦点     |    blur    |
|     单击      |   click    |
|     双击      |  dblclick  |
|    鼠标按下     | mousedown  |
|    鼠标弹起     |  mouseup   |
| 鼠标穿过元素或其子元素 | mouseover  |
| 鼠标离开元素或其子元素 |  mouseout  |
|   鼠标穿过元素    | mouseenter |
|   鼠标离开元素    | mouseleave |
|    鼠标移动     | mousemove  |
|    按下键盘     |  keydown   |
|  按下键盘产生字符   |  keypress  |
|    弹起键盘     |   keyup    |
|     触摸      | touchstart |
|     滑动      | touchmove  |
|     离开      |  touchend  |

### 事件对象

|   描述    |        示例         |
|:-------:|:-----------------:|
| 触发事件的对象 |      target       |
|  事件类型   |       type        |
| 阻止默认行为  | preventDefault()  |
|  阻止冒泡   | stopPropagation() |

### 示例

#### [放大输入框](示例/放大输入框.html)

```js
$('input').on({
    /* 失焦隐藏 */
    blur : function () {
        $('span').css({
            display : 'none',
        })
    },

    /* 聚焦显示 */
    focus : function () {
        $('span').css({
            display : 'inline-block',
        })
    },

    /* 键盘弹起，更新值
     * 如果值存在，显示，不存在，隐藏 */
    keyup : function () {
        let val = $(this).val()
        $('span').html(val).css({
            display : `${ val
                          ? 'inline-block'
                          : 'none' }`,
        })
    },
})
```

#### [局部放大](局部放大/index.html)

```js
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
            mask.css({ left : ${ x }px, top : ${ y }px })
            big.css(
                {
                    left : ${ -x * bigWidth / smallWidth }px,
                    top  : ${ -y * bigHeight / smallHeight }px,
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
```

## BOM

### 定时器

#### [倒计时](示例/倒计时.html)

```js
function f() {
    let time = new Date('2023-1-1') - new Date()
    const arr = [
        parseInt(time / 1000 / 60 / 60 % 24),
        parseInt(time / 1000 / 60 % 60),
        parseInt(time / 1000 % 60),
    ]
    $.each($('div'), function (index, item) {
        $(item).html(g(arr[index]))
    })
}

// 补足十位
function g(n) {
    return n < 10
           ? '0' + n
           : n
}

f()
setInterval(f, 1000)
```

#### [冷却发送](示例/冷却发送.html)

```js
$('button').on({
    click : function () {
        $(this).prop('disabled', true)
        let t = 3
        const timer = setInterval(() => {
            if (t) {
                $(this).html(`还剩${ t-- }秒`
                )
            } else {
                clearTimeout(timer)
                $(this).prop('disabled', false).html('重新发送')
            }
        }, 1000)
    },
})
```

#### [滑动动画](slide.js)

```js
/* 传入对象 / 结束位置 / 动画结束的回调函数
 * 将定时器作为对象的属性
 * 步长逐渐缩小，并往大取 */
function f(o, end, callback) {
    clearInterval(o.timer);
    o.timer = setInterval(function () {
        let step = (end - o.offsetLeft) / 10
        step = step > 0
               ? Math.ceil(step)
               : Math.floor(step)
        if (o.offsetLeft === end) {
            clearInterval(o.timer)
        } else {
            o.style.left = o.offsetLeft + step + 'px'
        }
        if (callback) {
            callback()
        }
    }, 10)
}
```

#### [滑动提示](示例/滑动提示.html)

```js
import slide from '../slide.js'

$(function () {
    let width = $('.tip').width()
    $('.slider').on({
        mouseenter : function () {
            slide($(this).find('.tip'), -width, function () {
                $('.arrow').html('→')
            })
        },
        mouseleave : function () {
            slide($(this).find('.tip'), 0, function () {
                $('.arrow').html('←')
            })
        },
    })
})
```

#### [轮播图](轮播图/index.html)

```js
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
```

#### [移动端轮播图](移动端轮播图/index.html)

```js
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
            transform : translateX(`${ -width * i + transform }px`),
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
```

### location

#### 属性

|  描述  |   示例   |
| :----: | :------: |
|  URL   |   href   |
|  协议  | protocol |
|  域名  |   host   |
|  路径  | pathname |
| 端口号 |   port   |
|  参数  |  search  |
|  片段  |   hash   |

#### 方法

|         描述         |   示例    |
| :------------------: | :-------: |
|  跳转页面，记录历史  | assign()  |
| 跳转页面，不记录历史 | replace() |
|       刷新页面       | reload()  |

### history

| 描述 | 示例 |
| :--: | :-------: |
| 后退 | back()   |
| 前进 | forward() |
| 跳转 | go()    |

