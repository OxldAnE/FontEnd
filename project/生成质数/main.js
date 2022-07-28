const generate = document.querySelector('#generate')
const quota = document.querySelector('#quota')
const output = document.querySelector('#output')
const reload = document.querySelector('#reload')
const userInput = document.querySelector('#userInput')

const worker = new Worker('generate.js')

/* 给生成按钮添加单击事件
 * 单击按钮，将消息发给工作线程 */
generate.addEventListener('click', () => {
  const myQuota = quota.value
  // 传送一个 JSON 对象给工作线程
  worker.postMessage({
    command: 'generate',
    quota: myQuota
  })
})

/* 给工作线程添加消息监听事件
 * 输出任务完成信息 */
worker.addEventListener('message', (message) => {
  output.textContent = `完成${message.data}个质数的生成!`
})

/* 给重开按钮添加单击事件
 * 刷新文档 */
reload.addEventListener('click', () => {
  document.location.reload()
})
