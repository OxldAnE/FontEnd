const small  = document.querySelector('.small'),
      big    = document.querySelector('.big'),
      bigImg = big.querySelector('img'),
      mask   = small.querySelector('.mask')
/* 鼠标进入
 * 显示大图和放大镜
 * 鼠标移动
 * 放大镜左上角的移动距离
 * 会将放大镜移除边界，则不移动
 * 大图按照比例反向移动 */
small.addEventListener('mouseenter', function () {
  mask.style.display = 'block'
  big.style.display = 'block'
  small.addEventListener('mousemove', function (e) {
    let x = e.pageX - small.offsetLeft - mask.offsetWidth / 2
    let y = e.pageY - small.offsetTop - mask.offsetHeight / 2
    if (x < 0) {
      x = 0
    }
    else if (x > small.offsetWidth - mask.offsetWidth) {
      x = small.offsetWidth - mask.offsetWidth
    }
    if (y < 0) {
      y = 0
    }
    else if (y > small.offsetHeight - mask.offsetHeight) {
      y = small.offsetHeight - mask.offsetHeight
    }
    mask.style.left = x + 'px'
    mask.style.top = y + 'px'
    bigImg.style.left = -x * 2 + 'px'
    bigImg.style.top = -y * 2 + 'px'
  })
})

/* 鼠标离开
 * 隐藏大图和放大镜 */
small.addEventListener('mouseleave', function () {
  mask.style.display = 'none'
  big.style.display = 'none'
})