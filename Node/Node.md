# `Node.js`

## 文件系统

```js
/* 文件系统 */
const fs = require('fs')
const path = require('path')
// 读取文件
fs.readFile('demo.text', 'utf-8', function (err, data) {
  if (err) {
    return console.error(err)
  }
  let str = data.replaceAll(' ', '-')
  // 写入文件
  // 写入不能创建文件夹，会覆盖原本内容
  fs.writeFile('demo1.text', str, function (err) {
    if (err) {
      return console.error(err)
    }
    console.log('写入成功')
  })
})
// 文件名
const filePath = './demo.md', baseName = path.basename(filePath)
const extName = path.extname(filePath)
const baseNameWithoutExtName = path.basename(filePath, extName)
console.log(baseName) // demo.md
console.log(extName) // .md
console.log(baseNameWithoutExtName) // demo
```

## 服务器

```js
/* 服务器 */
const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  const url = req.url
  let content = '<h1>404 Not Found</h1>'
  if (url === '/' || url === '/index.html') {
    content = '`<h1>首页</h1>`'
  }
  // 设置响应头
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  // 响应内容
  res.end(content)
})
server.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

```js
const fs = require('fs')
const http = require('http')
const path = require('path')
const server = http.createServer()
server.on('request', (req, res) => {
  const url = req.url
  const fileName = 'demo.text'
  const filePath = path.join(__dirname, url, fileName)
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.end('404 Not Found')
    }
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end(data)
  })
})
server.listen(8080, () => {console.log('http://127.0.0.1:8080')})
```
