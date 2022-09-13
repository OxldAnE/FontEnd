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