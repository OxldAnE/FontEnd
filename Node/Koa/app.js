const koa = require('koa')
const app = new koa()
const router = require('koa-router')()
const cors = require('koa2-cors')
const parser = require('koa-parser')

app.use(cors())
app.use(parser())
app.use(router.routes())

// 模拟数据库
const arr = [1, 2, 3]

router.get('/arr', async ctx => {
  ctx.body = arr
})
router.post('/arr', async ctx => {
  let num = ctx.request.body.num
  arr.push(num)
  ctx.body = true
})

router.delete('/arr/:id', async ctx => {
  let id = ctx.params.id
  arr.splice(id, 1)
  ctx.body = true
})

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})