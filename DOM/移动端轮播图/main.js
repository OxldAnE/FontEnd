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
