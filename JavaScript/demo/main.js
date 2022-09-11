$(function () {
  /* 每个观察元素设置进入可视区域的回调函数
   * 先获取进入区域的目标，再将寄存的图源赋值激活，随后取消观察 */
  const ob = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // 目标元素和可视窗口产生交叉区域
      if (entry.isIntersecting) {
        const tgt = entry.target
        const mySrc = tgt.getAttribute('mySrc')
        tgt.setAttribute('src', mySrc)
        ob.unobserve(tgt)
      }
    })
  })

})
