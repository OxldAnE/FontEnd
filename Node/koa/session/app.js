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
