const app = document.querySelector('#app')
const l = app.querySelector('img')
const r = l.nextElementSibling
const ul = app.querySelector('ul')
const lis = ul.querySelectorAll('li')
const ol = app.querySelector('ol')

/* 滑动效果 */
function slide (o, end) {
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

/* 启动向右轮播的定时器 */
let timer = setInterval(function () {
  r.click()
}, 1000)

/* 鼠标进入，显示左右按钮，停止定时器 */
app.addEventListener('mouseenter', function () {
  l.style.display = 'inline'
  r.style.display = 'inline'
  clearInterval(timer)
})

/* 鼠标离开，隐藏左右按钮，重启定时器 */
app.addEventListener('mouseleave', function () {
  l.style.display = 'none'
  r.style.display = 'none'
  timer = setInterval(function () {
    r.click()
  }, 1000)
})

/* 添加小圆圈，并记录索引 */
let len = lis.length
for (let i = 0; i < len; i++) {
  let li = document.createElement('li')
  li.index = i
  ol.appendChild(li)
}
const ols = ol.querySelectorAll('li')
ols[0].className = 'cur'

/* 为每个圆圈添加点击事件
 * 圆圈样式，滑动图片 */
ols.forEach(function (li) {
  li.addEventListener('click', function () {
    ols.forEach(function (li) {
      li.className = ''
    })
    this.className = 'cur'
    slide(ul, -app.offsetWidth * this.index)
  })
})

/* 左右按钮，点击圆圈 */
let i = 0
l.addEventListener('click', function () {
  ols[Math.abs(++i % len)].click()
})

r.addEventListener('click', function () {
  ols[Math.abs(--i % len)].click()
})