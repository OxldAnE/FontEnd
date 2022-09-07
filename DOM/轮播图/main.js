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



