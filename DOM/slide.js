/* 传入对象 / 结束位置 / 动画结束的回调函数
 * 将定时器作为对象的属性
 * 步长逐渐缩小，并往大取 */
export default function slide(p, end, callback) {
    // 获取 DOM 对象
    let o = p.get(0)
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
