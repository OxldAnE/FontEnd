# Node.js

## 配置

- 安装淘宝镜像

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

|     描述      |         示例         |
|:-----------:|:------------------:|
| 代码变化，自动重新启动 | cnpm i nodemon -g  |
|    项目初始化    |      npm init      |
|     koa     |     cnpm i koa     |
|     路由      | cnpm i koa-router  |
|   托管静态资源    | cnpm i koa-static  |
|   配置模板引擎    |  cnpm i koa-views  |
|    解析请求体    | cnpm i koa-parser  |
|    模板引擎     |  cnpm i nunjucks   |
|     会话      | cnpm i koa-session |

## 方法

|  描述  |        示例        |
|:----:|:----------------:|
|  导出  |  module.exports  |
|  导入  |    require()     |
| 监听端口 |   app.listen()   |
| 使用插件 |    app.use()     |
| 查询参数 |    ctx.query     |
| 动态参数 |    ctx.params    |
| 请求体  | ctx.request.body |
| 请求地址 |     ctx.url      |
| 请求方式 |    ctx.method    |
| 响应数据 |    ctx.send()    |
|      |                  |
|      |                  |
|      |                  |
|      |                  |
|      |                  |
|      |                  |

## 模块

### 路径

|       描述       |                         示例                         |
|:--------------:|:--------------------------------------------------:|
| 目录 + 文件名 + 扩展名 |                     __filename                     |
|       目录       |                     __dirname                      |
|   文件名 + 扩展名    |             path.basename(__filename)              |
|      扩展名       |              path.extname(__filename)              |
|      文件名       | path.basename(__filename,path.extname(__filename)) |

### 文件

|  描述  |    示例     |
|:----:|:---------:|
| 读取文件 | readFile  |
| 写入文件 | writeFile |

### [模板引擎](koa/模板引擎/app.js)

```js
const Koa = require('koa')
const app = new Koa()

// 路由
const router = require('koa-router')()
// 请求体解析
const parser = require('koa-parser')
app.use(parser())

// 模板渲染
const views = require('koa-views')
const nunjucks = require('nunjucks')
app.use(views(__dirname + '/views', {
    map : { html : 'nunjucks' },
}))

router.get('/', async ctx => {
    await ctx.render('index')
})
router.post('/login', async ctx => {
    let a = ctx.request.body.a
    await ctx.render('login', { a })
})

app.use(router.routes())

// 监听
app.listen(8080, () => {
    console.log('http://127.0.0.1:8080')
})
```

### Web 开发模式

|        |           服务端渲染           |           前后端分离            |
|:------:|:-------------------------:|:--------------------------:|
|   描述   | 服务器通过字符串拼接生成 HTML 页面发给客户端 | 后端负责 API 接口，前端通过 Ajax 调用接口 |
| 服务器压力大 |             1             |             0              |
|  SEO   |             1             |             0              |
|   开发   |             0             |             1              |
|  身份认证  |          Session          |            JWT             |
| 用户信息存储 |            服务器            |            客户端             |
|   验证   |    客户端每次发起请求，携带 Cookie    |  客户端每次发起请求，携带由服务器加密的Token  |

#### [Session](koa/session/app.js)

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
    } else {
        ctx.cookies.set('count', 1)
    }
    ctx.body = count
})

/* session */
app.keys = [ '123456' ]
app.use(session({
    maxAge : 1000,
}, app))

router.get('/session', async ctx => {
    if (ctx.session.count) {
        ++ctx.session.count
    } else {
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

#### [Ajax](koa/Ajax/app.js)

```js
$(function () {
    let i = 0
    $('.get').click(function () {
        axios.get('/arr').then(res => {console.log(res.data)})
    })
    $('.post').click(function () {
        axios.post('/arr', { item : i++ }).then(res => {console.log(res.data)})
    })
    $('.put').click(function () {
        axios.put('/arr/0', { item : i++ }).then(res => {console.log(res.data)})
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
app.use(views(__dirname + '/views', { map : { html : 'nunjucks' } }))

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

