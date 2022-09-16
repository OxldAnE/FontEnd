# `Node.js`

## 配置

- 安装淘宝镜像

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

|            描述            |        示例        |
| :------------------------: | :----------------: |
| 监听代码变化，自动重新启动 | `npm i nodemon -g` |
|                            |                    |
|                            |                    |
|                            |                    |
|                            |                    |
|                            |                    |
|                            |                    |
|                            |                    |



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

### 中间件

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

### `Web` 开发模式

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

### 模块

|      描述      |     示例     |
| :------------: | :----------: |
|      路由      | `koa-router` |
|  托管静态资源  | `koa-static` |
|  配置模板引擎  | `koa-views`  |
|  下载模板引擎  |  `nunjucks`  |
| 解析请求体数据 | `koa-parser` |

### 模板引擎

```js
/* koa 对象，路由 */
const koa = require('koa')
const app = new koa()
const router = require('koa-router')()

/* 解析请求体数据 */
const parser = require('koa-parser')
app.use(parser())

/* 模板引擎，后端渲染 */
const views = require('koa-views')
const nunjucks = require('nunjucks')
app.use(views(__dirname + '/views', {
  map : {html : 'nunjucks'},
}))

/* 主页渲染 */
router.get('/', async ctx => {
  await ctx.render('index')
})

/* 用主页登录时，提交的数据去渲染登录页面 */
router.post('/login', async ctx => {
  await ctx.render('login', {
    un : ctx.request.body.username,
  })
})

app.use(router.routes())
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```

### `Session`

```js
const koa = require('koa')
const app = new koa()
const router = require('koa-router')()
const session = require('koa-session')

/* cookie */
router.get('/cookie', async ctx => {
  let count = ctx.cookies.get('count')
  if (count) {
    ++count
    ctx.cookies.set('count', count, {
      maxAge : 1000,
    })
  }
  else {
    ctx.cookies.set('count', 1)
  }
  ctx.body = count
})

/* session */
app.keys = ['123456']
app.use(session({
  maxAge : 1000,
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

```js
$(function () {
  let i = 0
  $('.get').click(function () {
    axios.get('/arr').then(res => {console.log(res.data)})
  })
  $('.post').click(function () {
    axios.post('/arr', {item : i++}).then(res => {console.log(res.data)})
  })
  $('.put').click(function () {
    axios.put('/arr/0', {item : i++}).then(res => {console.log(res.data)})
  })
  $('.delete').click(function () {
    axios.delete('/arr/0').then(res => {console.log(res.data)})
  })
})
```

```js
/* 后端渲染 */
const koa = require('koa')
const app = new koa()
const router = require('koa-router')()

const parser = require('koa-parser')
app.use(parser())
const views = require('koa-views')
const nunjucks = require('nunjucks')
app.use(views(__dirname + '/views', {map : {html : 'nunjucks'}}))

router.get('/', async ctx => {
  await ctx.render('index')
})

/* get 查
 * post 增
 * put 改
 * delete 删 */
const arr = []
router.get('/arr', ctx => {
  ctx.body = arr
})
router.post('/arr', ctx => {
  arr.push(ctx.request.body.item)
  ctx.body = arr
})
router.put('/arr/:id', ctx => {
  arr.splice(ctx.params.id, 1, ctx.request.body.item)
  ctx.body = arr
})
router.delete('/arr/:id', ctx => {
  arr.splice(ctx.params.id, 1)
  ctx.body = arr
})

app.use(router.routes())

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
```