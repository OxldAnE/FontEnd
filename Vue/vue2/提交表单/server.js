/* koa 搭建后台服务器 */
const koa = require('koa')
const app = new koa()
const router = require('koa-router')()
const cors = require('koa2-cors')
const parser = require('koa-parser')

app.use(cors()) // 跨域
app.use(parser()) // 解析请求体
app.use(router.routes()) // 路由

const arr = [1, 2]

router.get('/', async ctx => {
  ctx.body = arr
})

router.post('/', async ctx => {
  arr.push(ctx.request.body.str)
  ctx.body = true
})

router.delete('/:id', async ctx => {
  arr.splice(ctx.params.id, 1)
  ctx.body = true
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
