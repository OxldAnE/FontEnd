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

