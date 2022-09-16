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