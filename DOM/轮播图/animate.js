/* 滑动效果 */
export default function animate (o, end, callback) {
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
