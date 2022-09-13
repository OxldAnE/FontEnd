# `Node.js`

## 内置

### 模块

|  描述  |  示例  |
| :----: | :----: |
|  文件  |  `fs`  |
|  路径  | `path` |
| 服务器 | `http` |

### 方法

|          描述          |                         示例                         |
| :--------------------: | :--------------------------------------------------: |
| 目录 + 文件名 + 扩展名 |                     `__filename`                     |
|          目录          |                     `__dirname`                      |
|    文件名 + 扩展名     |             `path.basename(__filename)`              |
|         扩展名         |              `path.extname(__filename)`              |
|         文件名         | `path.basename(__filename,path.extname(__filename))` |
|        请求地址        |                      `req.url`                       |
|        请求方式        |                     `req.method`                     |
|        响应数据        |                     `res.end()`                      |
|        导出对象        |                   `module.exports`                   |

## `Express`

### 方法

|     描述     |     示例     |
| :----------: | :----------: |
| 获取查询参数 | `req.query`  |
| 获取动态参数 | `req.params` |
|  获取请求体  |  `req.body`  |
|   响应数据   | `res.send()` |

## 中间件

|          描述          |          示例          |
| :--------------------: | :--------------------: |
|      托管静态资源      |   `express.static()`   |
|      创建路由对象      |   `express.Router()`   |
|  解析`JSON`请求体数据  |    `express.json()`    |
| 解析表单格式请求体数据 | `express.urlencoded()` |
|          跨域          |        `cors()`        |
|     配置数据库对象     |  `mysql.createPool()`  |

- 简单请求方式
  - 只发生一次请求
  - `GET`/`POST`/`HEAD`

## `Web` 开发模式

|              |                   服务端渲染                   |                  前后端分离                   |
| :----------: | :--------------------------------------------: | :-------------------------------------------: |
|     描述     | 服务器通过字符串拼接生成 `HTML` 页面发给客户端 | 后端负责 `API` 接口，前端通过 `Ajax` 调用接口 |
| 服务器压力大 |                       1                        |                       0                       |
|    `SEO`     |                       1                        |                       0                       |
|     开发     |                       0                        |                       1                       |
|   身份认证   |                   `Session`                    |                     `JWT`                     |
| 用户信息存储 |                     服务器                     |                    客户端                     |
|     验证     |       客户端每次发起请求，携带 `Cookie`        | 客户端每次发起请求，携带由服务器加密的`Token` |

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