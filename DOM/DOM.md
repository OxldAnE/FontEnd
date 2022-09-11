# `DOM`

## 元素

|          描述          |                示例                |
| :--------------------: | :--------------------------------: |
|      获取单个元素      |   `document.querySelector('ul')`   |
|      获取全部元素      | ` document.querySelectorAll('li')` |
|      获取 `html`       |     `document.documentElement`     |
|      获取 `body`       |          `document.body`           |
|       获取父节点       |            `parentNode`            |
|     获取所有子元素     |             `children`             |
|     获取首个子元素     |        `firstElementChild`         |
|   获取最后1个子元素    |         `lastElementChild`         |
|    获取下个兄弟元素    |        `nextElementSibling`        |
|    获取上个兄弟元素    |      `previousElementSibling`      |
|        创建元素        |  ` document.createElement('li')`   |
| 添加子节点到父节点末尾 |        `ul.appendChild(li)`        |
| 在指定节点前插入子节点 |   `ul.insertBefore(li, lis[0])`    |
|        删除节点        |             `remove()`             |
|       删除子节点       |        `ul.removeChild(li)`        |
|       深拷贝节点       |        `li.cloneNode(true)`        |
|     获取节点的内容     |           `li.innerHTML`           |
|      设置内联样式      |          `li.style.color`          |
|       获取属性值       |      `li.getAttribute('id')`       |
|       设置属性值       |    `li.setAttribute('id', 'l')`    |
|        移除属性        |     `li.removeAttribute('id')`     |

## 事件

![image-20220904223927048](assets/image-20220904223927048.png)

|   描述   |                 示例                 |
| :------: | :----------------------------------: |
| 添加事件 |  `li.addEventListener('click', f)`   |
| 删除事件 | `li.removeEventListener('click', f)` |

### 事件类型

|          描述          |     示例     |
| :--------------------: | :----------: |
|      全部加载完成      |    `load`    |
|        卸载完成        |   `unload`   |
|      窗口改变大小      |   `resize`   |
|       滚动条滚动       |   `scroll`   |
|        获得焦点        |   `focus`    |
|        失去焦点        |    `blur`    |
|          单击          |   `click`    |
|          双击          |  `dblclick`  |
|        鼠标按下        | `mousedown`  |
|        鼠标弹起        |  `mouseup`   |
| 鼠标穿过元素或其子元素 | `mouseover`  |
| 鼠标离开元素或其子元素 |  `mouseout`  |
|      鼠标穿过元素      | `mouseenter` |
|      鼠标离开元素      | `mouseleave` |
|        鼠标移动        | `mousemove`  |
|        按下键盘        |  `keydown`   |
|    按下键盘产生字符    |  `keypress`  |
|        弹起键盘        |   `keyup`    |
|          触摸          | `touchstart` |
|          滑动          | `touchmove`  |
|          离开          |  `touchend`  |

### 事件对象

|      描述      |         示例          |
| :------------: | :-------------------: |
| 触发事件的对象 |      `e.target`       |
|    事件类型    |       `e.type`        |
|  阻止默认行为  | `e.preventDefault()`  |
|    阻止冒泡    | `e.stopPropagation()` |

### 示例

#### [放大输入框](示例/放大输入框.html)

```js
$(function () {
  $('input').on({
    /* 失焦隐藏 */
    blur : function () {
      $('span').css({display : 'none'})
    },

    /* 聚焦显示 */
    focus : function () {
      $('span').css({display : 'inline-block'})
    },
    /* 键盘弹起，更新值
     * 如果值存在，显示，不存在隐藏 */
    keyup : function () {
      $('span').html($(this).val()).css({
        display : `${ $(this).val()
                      ? 'inline-block'
                      : 'none' }`,
      })
    },
  })
})
```

#### [局部放大](局部放大/index.html)

```js
$(function () {
  let big = $('.big')
  let mask = $('.mask')
  $('div:first-child').on({
    /* 鼠标进入
     * 显示大图和放大镜 */
    mouseenter : function () {
      big.css({display : 'block'})
      mask.css({display : 'block'})

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
        }
        else if (x > smallWidth - maskWidth) {
          x = smallWidth - maskWidth
        }

        if (y < 0) {
          y = 0
        }
        else if (y > smallHeight - maskHeight) {
          y = smallHeight - maskHeight
        }
        mask.css({left : `${ x }px`, top : `${ y }px`})
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
      big.css({display : 'none'})
      mask.css({display : 'none'})
    },
  })
})
```

## `BOM`

### 定时器

#### [倒计时](示例/倒计时.html)

```js
$(function () {
  f()
  setInterval(f, 1000)

  function f () {
    let time = new Date('2023-1-1') - new Date()
    const arr = [
      parseInt(time / 1000 / 60 / 60 % 24),
      parseInt(time / 1000 / 60 % 60),
      parseInt(time / 1000 % 60)]
    $.each($('div'), function (index, item) {
      $(item).html(g(arr[index]))
    })
  }

  // 补足十位
  function g (n) {
    return n < 10
           ? '0' + n
           : n
  }
})
```

#### [冷却发送](示例/冷却发送.html)

```js
const btn = document.querySelector('button')
btn.addEventListener('click', function () {
  this.disabled = true
  let t = 3
  let timer = setInterval(() => {
    if (t) {
      this.innerHTML = `还剩${ t-- }秒`
    }
    else {
      clearInterval(timer)
      this.disabled = false
      this.innerHTML = '重新发送'
    }
  }, 1000)
})
```

#### [移动盒子](移动盒子.html)

```js
const div = document.querySelector('div')
const r = document.querySelector('.right')
const l = document.querySelector('.left')

/* 传入对象和结束位置
* 将定时器作为对象的属性
* 步长逐渐缩小，并往大整 */
function f (o, end) {
  clearInterval(o.timer);
  o.timer = setInterval(function () {
    let step = (end - o.offsetLeft) / 10
    step = step > 0
           ? Math.ceil(step)
           : Math.floor(step)
    if (o.offsetLeft === end) {
      clearInterval(o.timer)
    }
    else {
      o.style.left = o.offsetLeft + step + 'px'
    }
  }, 10)
}
r.addEventListener('click', function () {
return f(div, 600)
})
l.addEventListener('click', function () {
return f(div, 100)
})
```

#### [滑动提示](滑动提示.html)

```js
const slider = document.querySelector('.slider')
const tip = slider.querySelector('.tip')
const arrow = slider.querySelector('.arrow')

// 鼠标进入
slider.addEventListener('mouseenter', function () {
  slide(tip, -128, function () {
    arrow.innerHTML = '→'
  })
})
// 鼠标离开
slider.addEventListener('mouseleave', function () {
  slide(tip, 0, function () {
    arrow.innerHTML = '←'
  })
})

// 滑动动画
function slide (o, end, callback) {
  clearInterval(o.timer);
  o.timer = setInterval(function () {
    let step = (end - o.offsetLeft) / 10
    step = step > 0
           ? Math.ceil(step)
           : Math.floor(step)
    if (o.offsetLeft === end) {
      clearInterval(o.timer)
      if (callback) {
        callback()
      }
    }
    else {
      o.style.left = o.offsetLeft + step + 'px'
    }
  }, 10)
}
```

#### [轮播图](轮播图/index.html)

```js
import animate from './animate.js'

const app = document.querySelector('#app')
const ul = app.querySelector('ul')
const ol = app.querySelector('ol')
const l = app.querySelector('img')
const r = l.nextElementSibling
const ulLis = ul.querySelectorAll('li')

/* 添加小圆圈，并记录索引 */
let len = ulLis.length
let width = app.offsetWidth
ol.innerHTML = '<li></li>'.repeat(len)
const olLis = ol.querySelectorAll('li')
olLis[0].className = 'cur'

/* 在轮播图的头部和尾部分别插入最后和第一张图片 */
ul.insertBefore(ulLis[len - 1].cloneNode(true), ulLis[0])
ul.appendChild(ulLis[0].cloneNode(true))

/* 当前圆圈点击样式 */
olLis.cur = function (li) {
  olLis.forEach(function (li) {
    li.className = ''
  })
  li.className = 'cur'
}

/* 为每个圆圈添加点击事件
 * 点击样式，滑动图片
 * 动画最后会执行回调函数，将节流阀打开 */
let flag = true
for (let i = 0; i < len; i++) {
  olLis[i].addEventListener('click', function () {
    if (flag) {
      flag = false
      olLis.cur(this)
      animate(ul, -width * (i + 1), function () {
        flag = true
      })
    }
  })
}

/* 启动向右轮播的定时器 */
let timer = setInterval(function () {
  r.click()
}, 2000)

/* 鼠标进入，显示前后按钮，停止定时器 */
app.addEventListener('mouseenter', function () {
  l.style.display = 'block'
  r.style.display = 'block'
  clearInterval(timer)
})

/* 鼠标离开，隐藏前后按钮，重启定时器 */
app.addEventListener('mouseleave', function () {
  l.style.display = 'none'
  r.style.display = 'none'
  timer = setInterval(function () {
    r.click()
  }, 1000)
})

/* 为前后按钮添加点击事件 */
// 真正的第一张图片在所有图片的所有为 1
let i = 1
l.addEventListener('click', function () {
  if (flag) {
    flag = false
    // 在真正的最后一张图片向后时，切回插入的第一张
    if (i === len) {
      ul.style.left = '0px'
      i = 0
    }
    ++i
    olLis.cur(olLis[i - 1])
    animate(ul, -width * i, function () {
      flag = true
    })
  }
})
r.addEventListener('click', function () {
  if (flag) {
    flag = false
    // 在真正的第一张图片向前时，切回插入的最后一张
    if (i === 1) {
      ul.style.left = -width * (len + 1) + 'px'
      i = len + 1
    }
    --i
    olLis.cur(olLis[i - 1])
    animate(ul, -width * i, function () {
      flag = true
    })
  }
})
```

#### [移动端轮播图](移动端轮播图/index.html)

```js
const app = document.querySelector('#app')
const ul = app.querySelector('ul')
const ol = app.querySelector('ol')
const ols = ol.querySelectorAll('li')
let l = ols.length
let w = app.offsetWidth

/* 可向左移动 4 次，向右移动 1 次
 * -1 0 1 2 3 4
 * 向左移动轮播，添加动画效果 */
let i = 0
let timer = setInterval(function () {
  ++i
  ul.style.transition = 'all .3s'
  ul.style.transform = `translateX(${ -w * i }px)`
}, 2000)

/* 轮播后的处理
 * 从头尾的图片传送回中间相同的图片
 * 4 传回 0 ，-1 传回 3
 * 圆圈样式 */
ul.addEventListener('transitionend', function () {
  if (i === l) {
    i = 0
    ul.style.transition = 'none'
    ul.style.transform = `translateX(${ -w * i }px)`
  }
  else if (i === -1) {
    i = l - 1
    ul.style.transition = 'none'
    ul.style.transform = `translateX(${ -w * i }px)`
  }
  ol.querySelector('.cur').classList.remove('cur')
  ols[i].className = 'cur'
})

/* 触屏轮播 */
// 起始位置
let x = 0
// 移动距离
let moveX = 0
// 判断是否移动
let isMove = false

/* 记录开始位置 */
ul.addEventListener('touchstart', function (e) {
  clearInterval(timer)
  x = e.targetTouches[0].pageX
})

/* 拖动图片移动,无动画效果,阻止默认滚动屏幕 */
ul.addEventListener('touchmove', function (e) {
  moveX = e.targetTouches[0].pageX - x
  ul.style.transition = 'none'
  ul.style.transform = `translateX(${ -w * i + moveX }px)`
  isMove = true
  e.preventDefault()
})

/* 发生移动
 * 移动距离大于 1/5 切换图片 */
ul.addEventListener('touchend', function (e) {
  if (isMove) {
    if (moveX > w / 5) {
      i--
    }
    else if (moveX < -w / 5) {
      i++
    }
    ul.style.transition = 'all .3s'
    ul.style.transform = `translateX(${ -w * i }px)`
    clearInterval(timer)
    timer = setInterval(function () {
      ++i
      ul.style.transition = 'all .3s'
      ul.style.transform = `translateX(${ -w * i }px)`
    }, 2000)
  }
})
```

#### [导航栏滑动](导航栏滑动.html)

```js
const nav = document.querySelector('nav')
const span = nav.querySelector('span')
const lis = nav.querySelectorAll('li')

/* 鼠标进入、离开、点击 */
let l = span.offsetLeft
lis.forEach(li => {
  li.addEventListener('mouseenter', function () {
    slide(span, this.offsetLeft)
  })
  li.addEventListener('mouseleave', function () {
    slide(span, l)
  })
  li.addEventListener('click', function () {
    l = this.offsetLeft
  })
})

function slide (o, end, callback) {
  clearInterval(o.timer);
  o.timer = setInterval(function () {
    let step = (end - o.offsetLeft) / 10
    step = step > 0
           ? Math.ceil(step)
           : Math.floor(step)
    if (o.offsetLeft === end) {
      clearInterval(o.timer)
      callback && callback()
    }
    else {
      o.style.left = o.offsetLeft + step + 'px'
    }
  }, 20)
}
```

### `location`

#### 属性

|  描述  |    示例    |
| :----: | :--------: |
| `URL`  |   `href`   |
|  域名  |   `host`   |
| 端口号 |   `port`   |
|  路径  | `pathname` |
|  参数  |  `search`  |
|  片段  |   `hash`   |
|  协议  | `protocol` |

#### 方法

|         描述         |    示例     |
| :------------------: | :---------: |
|  跳转页面，记录历史  | `assign()`  |
| 跳转页面，不记录历史 | `replace()` |
|       刷新页面       | `reload()`  |

### `history

|   描述   |    示例     |
| :------: | :---------: |
|   后退   |  `back()`   |
|   前进   | `forward()` |
| 后退一步 |  `go(-1)`   |

|            描述            |      示例      |   用法   |
| :------------------------: | :------------: | :------: |
|       包括边框的高度       | `offsetHeight` | 元素位置 |
|      不包括边框的高度      | `clientHeight` | 元素大小 |
| 不包括边框包括滚动条的高度 | `scrollHeight` | 滚动距离 |

