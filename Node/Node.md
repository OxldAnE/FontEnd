# `Node.js`

## 命令行

|     命令     |        描述        |
| :----------: | :----------------: |
|     `cd`     |      移动目录      |
|     `ls`     | 列出所在目录的内容 |
|    `dir`     |      查看文件      |
|   `mkdir`    |      创建目录      |
| `rmdir` `-r` |      删除目录      |
|   `touch`    |      创建文件      |
|     `rm`     |      删除文件      |
|     `mv`     | 移动文件到指定位置 |
|     `cp`     | 复制文件到指定位置 |

## `Git`

![image-20220804234834436](assets/image-20220804234834436.png)

|   指令   |                 描述                 |
| :------: | :----------------------------------: |
|  `init`  |         初始化，跟踪现有目录         |
| `clone`  |        创建远程项目的本地副本        |
|  `add`   |             代码更改跟踪             |
| `commit` |          保存到项目历史记录          |
|  `push`  |       从本地仓库推送到远程仓库       |
| `fetch`  |         从远程拉取到本地仓库         |
|  `diff`  |       比较暂存区和工作区的差异       |
|  `pull`  |    从远程仓库拉取并合并到本地仓库    |
| `branch` |        显示正在本地处理的分支        |
| `merge`  |         合并在同分支上的更改         |
| `status` | 上次提交之后是否有对文件进行再次修改 |

## 模块化

```js
module.exports = {
  a: 1,
  f () {
    console.log(this.a)
  },
}
```

```js
/* 模块化
 * require 加载模块
 * module 对象中的 exports 对象为对外接口
 * 自定义模块 ./ 不可省 */
const demo = require('./Koa.js')
demo.f() // 1
```

## 文件系统

```js
/* 文件系统
 * fs 文件模块
 * path 路径模块
 * 写入不能创建文件夹，且会覆盖原本内容  */
const fs = require('fs')
const path = require('path')

// 读取文件
fs.readFile('1.txt', 'utf-8', (err, data) => {
  if (err) {
    return console.error(err)
  }
  let str = data.split('').join('-')
  // 写入文件
  fs.writeFile('2.txt', str, (err) => {
    if (err) {
      return console.error(err)
    }
    console.log('写入成功')
  })
})

// 目录 + 文件名 + 扩展名
console.log(__filename)
// 目录
console.log(__dirname)
// 文件名 + 扩展名
console.log(path.basename(__filename))
// 扩展名
console.log(path.extname(__filename))
// 文件名
console.log(path.basename(__filename, path.extname(__filename)))
```

## 服务器

```js
/* http web服务器模块 */
const http = require('http')
// 创建服务器实例
const server = http.createServer((req, res) => {
  // 防止中文乱码
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  // 响应内容
  res.end(`你请求的 URL = ${req.url}`)
})

// 启动服务器
server.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

## `Koa`

```js
/* Koa 创建服务器 */
const koa = require('koa')
const app = new koa()
// 引入并执行路由
const router = require('koa-router')()
// 静态
const static = require('koa-static')

router.get('/', async ctx => {
  ctx.body = '/'
})

router.get('/video', async ctx => {
  ctx.body = '/video'
})

// 挂载路由
app.use(router.routes())
// 静态资源
app.use(static(__dirname + '/public'))

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
  console.log('http://127.0.0.1:8080/1.png')

})
```

### 模板引擎

```html
<!-- index.html -->
<!-- 默认 get -->
<!-- <form action="/login"> -->
<!--     <input type="text" name="username" placeholder='用户名'> -->
<!--     <input type="password" name="password" placeholder="密码"> -->
<!--     <input type="submit" value="登录"> -->
<!-- </form> -->
<form action="/login" method="post">
    <input type="text" name="username" placeholder='用户名'>
    <input type="password" name="password" placeholder="密码">
    <input type="submit" value="登录">
</form>
```

```html
<!-- login.html -->
用户名：{{username}}
密码：{{password}}
```

```js
/* 模板引擎 后端渲染 */
const koa = require('koa')
const app = new koa()
const views = require('koa-views')
const nunjucks = require('nunjucks')
const router = require('koa-router')()
// post 依赖
const parser = require('koa-parser')

app.use(parser())
// 设置模板引擎
app.use(views(__dirname + '/views', {
  map: {html: 'nunjucks'},
}))

// 主页
router.get('/', async ctx => {
  await ctx.render('index')
})
// get 请求
router.get('/login', async ctx => {
  await ctx.render('login', {
    // 查询参数传参
    username: ctx.query.username,
    password: ctx.query.password,
  })
})
router.post('/login', async ctx => {
  await ctx.render('login', {
    // 请求体传参
    username: ctx.request.body.username,
    password: ctx.request.body.password,
  })
})

app.use(router.routes())
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

### `Cookie`/`Session`

```js
const koa = require('koa')
const app = new koa()
const router = require('koa-router')()
const session = require('koa-session')

// cookie
router.get('/cookie', async ctx => {
  let count = ctx.cookies.get('count')
  if (count) {
    ++count
    // 设置 cookies 键 值 有效期
    ctx.cookies.set('count', count, {maxAge: 1000})
  }
  else {
    ctx.cookies.set('count', 1)
  }
  ctx.body = count
})

// session
app.keys = ['123456']
app.use(session({
  maxAge: 1000,
}, app))

router.get('/session', async ctx => {
  if (ctx.session.count) {
    ++ctx.session.count
  }
  else {
    ctx.session.count = 1
  }
  ctx.body = ctx.session.count
})

app.use(router.routes())
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080/cookie')
  console.log('http://127.0.0.1:8080/session')
})
```

### `Ajax`

```html
<!-- Ajax  -->
<button>获取数据</button>
<script>
  const btn = document.querySelector('button')
  // 回调函数封装 Ajax
  // btn.addEventListener('click', function () {
  //   myAjax('get', '/data', function (result) {
  //     alert(result)
  //   })
  // })

  // function myAjax (method, url, next) {
  //   const xhr = new XMLHttpRequest()
  //   // 设置请求类型
  //   xhr.open(method, url)
  //   // 发送请求
  //   xhr.send()
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       // 回调函数返回异步结果
  //       next(xhr.responseText)
  //     }
  //   }
  // }

  // Promise 封装 Ajax
  btn.addEventListener('click', function () {
    myAjax('get', '/data').then(result => {
      alert(result)
    })
  })

  function myAjax (method, url) {
    return new Promise(function (resolve) {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText)
        }
      }
    })
  }
</script>
```

```html
<!-- 增删改查 -->
<button class="get">查询</button>
<button class="post">添加</button>
<button class="put">修改</button>
<button class="delete">删除</button>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
  let i = 0
  document.querySelector('.get').addEventListener('click', function () {
    axios.get('/arr').then(result => {console.log(result.data)})
  })
  document.querySelector('.post').addEventListener('click', function () {
    axios.post('/arr', {item: i++}).then(result => {console.log(result.data)})
  })
  document.querySelector('.put').addEventListener('click', function () {
    axios.put('/arr/0', {item: i++}).then(result => {console.log(result.data)})
  })
  document.querySelector('.delete').addEventListener('click', function () {
    axios.delete('/arr/0').then(result => {console.log(result.data)})
  })
</script>
```

```js
const koa = require('koa')
const app = new koa()
const router = require('koa-router')()

const views = require('koa-views')
app.use(views(__dirname + '/views', {map: {html: 'nunjucks'}}))
const nunjucks = require('nunjucks')

const parser = require('koa-parser')
app.use(parser())

router.get('/', async ctx => {
  await ctx.render('index')
})

const arr = []
router.get('/arr', ctx => {
  ctx.body = arr
})
router.post('/arr', ctx => {
  let item = ctx.request.body.item
  arr.push(item)
  ctx.body = arr
})
router.put('/arr/:id', ctx => {
  let id = ctx.params.id
  let item = ctx.request.body.item
  arr.splice(id, 1, item)
  ctx.body = arr
})
router.delete('/arr/:id', ctx => {
  let id = ctx.params.id
  arr.splice(id, 1)
  ctx.body = arr
})

app.use(router.routes())

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

## `Express`

```js
/* express
 * get 请求
 * post 请求
 * query 查询参数 /?键=值&键=值
 * params /:键/:键 */
const express = require('express')
// web 服务器
const app = express()

app.get('/', (req, res) => {
  res.send('get')
})

app.post('/', (req, res) => {
  res.send('post')
})

// 启动服务器
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080/')
})
```

## 路由

```js
/* 路由
 * 客户端请求与服务器处理函数的映射关系
 * 请求类型与 URL 都匹配成功，调用处理函数 */
const express = require('express')
// 创建路由对象
const router = express.Router()
router.get('/', (req, res) => {
  res.send('get')
})
router.post('/', (req, res) => {
  res.send('post')
})
// 向外暴露路由对象
module.exports = router
```

## 中间件

```js
/* 中间件
 * next 函数将流转关系转交给下个中间件或路由
 * 下游能访问上游属性和方法
 * 中间件按照顺序执行
 * 全局中间件 客户端请求到达服务器都会触发 */
const express = require('express')
const app = express()

// 全局中间件
app.use((req, res, next) => {
  req.a = '全局中间件'
  console.log('全局中间件')
  next()
})

// 局部中间件
app.get('/',
  (req, res, next) => {
    console.log('局部中间件1'), next()
  }, (req, res, next) => {
    console.log('局部中间件2'), next()
  }, (req, res) => {
    console.log('路由')
    res.send(req.a)
  })

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

### 错误中间件

```js
/* 捕获错误的中间件
 * 注册在所有路由之后，捕获整个项目的异常错误，防止程序崩溃 */
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  throw new Error('err')
  res.send('1')
})

app.use((err, req, res, next) => {
  res.send(`2 ${err.message}`)
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

### 内置中间件

```js
/* 内置中间件
 * static 托管静态资源
 * json 解析 JSON 格式的请求体
 * urlencoded 解析表单格式的请求体 */
const express = require('express')
const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.post('/', (req, res) => {
  // 请求体数据
  res.send(req.body)
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

### 自定义中间件

```js
/* 自定义中间件
 * querystring 将查询字符串解析为对象
 * data 接收分段发送的数据
 * end 请求体数据全部接收 */
const express = require('express')
const app = express()

const qs = require('querystring')

app.use((req, res, next) => {
  let str = ''
  req.on('data', chunk => {
    str += chunk
  })
  req.on('end', () => {
    req.body = qs.parse(str)
    next()
  })
})

app.post('/', (req, res) => {
  res.send(req.body)
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

## 接口与跨域

```js
/* 跨域
 * cors 由 HTTP 响应头 -Access-Control-Allow- 组成
 * Origin 指定允许访问的外域
 * Headers 显示声明除默认支持客户端向服务器发送9个外的请求头
 * Methods 显示声明除默认 GET POST HEAD 外的请求类型
 * 在接口服务器配置 cors 解除浏览器的跨域访问限制
 * JSONP 仅支持 GET */
const express = require('express')
const app = express()

// 接口跨域
const cors = require('cors')
app.use(cors())

// 在路由之前配置解析表单中间件
app.use(express.urlencoded({extended: false}))

const router = require('./router.js')
app.use('/api', router)

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

```js
const express = require('express')
const router = express.Router()
router.get('/get', (req, res) => {
  const query = req.query
  res.send({
    status: 0,
    msg   : 'GET',
    data  : query,
  })
})

router.post('/post', (req, res) => {
  const body = req.body
  console.log(body)
  res.send({
    status: 0,
    msg   : 'POST',
    data  : body,
  })
})

module.exports = router
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
    <script src="https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>

<button id="getBtn">GET</button>
<button id="postBtn">POST</button>

<script>
    $(function () {
        $('#getBtn').on('click', function () {
            $.ajax({
                tyep   : 'GET',
                url    : 'http://127.0.0.1:8080/api/get',
                data   : {get: 1},
                success: function (res) {
                    console.log(res)
                },
            })
        })
        $('#postBtn').on('click', function () {
            $.ajax({
                type   : 'POST',
                url    : 'http://127.0.0.1:8080/api/post',
                data   : {post: 2},
                success: function (res) {
                    console.log(res)
                },
            })
        })
    })
</script>

</body>
</html>
```

## `SQL`

```js
/* SQL */
const mysql = require('mysql')
// 配置对象
const db = mysql.createPool({
  host    : '127.0.0.1',
  user    : 'root',
  password: 'admin123',
  database: 'Koa',
})
const user = {
  username: 'aaa',
  password: '000000',
}
const insertSql = 'insert into users set ?'
db.query(insertSql, user, (err, results) => {
  if (err) {
    return console.error(err.message)
  }
  if (results.affectedRows === 1) {
    console.log(1)
  }
})
```

## `Web` 开发模式

|              |                  服务端渲染                  |                  前后端分离                   |
| :----------: | :------------------------------------------: | :-------------------------------------------: |
|     描述     | 服务器通过字符串拼接生成 HTML 页面发给客户端 | 后端负责 `API` 接口，前端通过 `Ajax` 调用接口 |
| 服务器压力大 |                      1                       |                       0                       |
|  利于`SEO`   |                      1                       |                       0                       |
|   利于开发   |                      0                       |                       1                       |
|   身份认证   |                  `Session`                   |                     `JWT`                     |
| 用户信息存储 |                    服务器                    |                    客户端                     |

### `Session`

```js
/* Session 认证
 * 服务器将用户信息存储在服务器，生成 Cookie 发给客户端
 * 客户端每次发起请求携带 Cookie
 * 服务器对客户端进行身份认证 */
const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({
  secret           : 'itheima',
  resave           : false,
  saveUninitialized: true,
}))

// 登录
app.post('/api/login', (req, res) => {
  // 验证登录信息
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({status: 1, msg: '登录失败'})
  }
  // 保存成功登录的用户状态
  req.session.user = req.body
  req.session.islogin = true

  res.send({status: 0, msg: '登录成功'})
})

// 获取用户信息
app.get('/api/username', (req, res) => {
  // 未登录
  if (!req.session.islogin) {
    return res.send({status: 1, msg: 'fail'})
  }
  res.send({
    status  : 0,
    msg     : 'success',
    username: req.session.user.username,
  })
})

// 退出登录
app.post('/api/logout', (req, res) => {
  // 删除 Session
  req.session.destroy()
  res.send({
    status: 0,
    msg   : '退出登录成功',
  })
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

### `JWT`

```js
/* JWT 认证
 * 服务器将用户信息加密生成 Token 字符串发给客户端
 * 客户端每将 Token 存储到 Web 缓存，并在每次发起请求时携带
 * 服务器对客户端进行身份认证
 * Header 描述头部
 * Payload 用户信息
 * Signature 数据签名 */
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 解析表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

//  加密密钥
const secretKey = 'itheima No1 ^_^'

// 将 JWT 字符串还原成 JSON 对象的中间件
app.use(expressJWT({secret: secretKey}).unless({path: [/^\/api\//]}))

// 登录
app.post('/api/login', function (req, res) {
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status : 400,
      message: '登录失败！',
    })
  }
  // 登录成功
  // sign 方法生成 JWT 字符串，经由 token 属性发给客户端
  // 用户信息 加密密钥  token 有效期
  const tokenStr = jwt.sign(
    {username: userinfo.username}, secretKey, {expiresIn: '30s'})
  res.send({
    status : 200,
    message: '登录成功！',
    token  : tokenStr,
  })
})

// 获取用户信息
app.get('/admin/getinfo', function (req, res) {
  res.send({
    status : 200,
    message: '获取用户信息成功！',
    data   : req.user,
  })
})

// 捕获 JWT 错误
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status : 401,
      message: '无效的token',
    })
  }
  res.send({
    status : 500,
    message: '未知的错误',
  })
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

