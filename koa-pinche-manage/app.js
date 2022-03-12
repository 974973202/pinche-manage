const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const router = new Router()
const ENV = 'cloud-prop-0g0aq5yg1035c0c5'
const PORT = 3303

// 跨域
app.use(cors({
    // origin: ['http://localhost:9528', 'http://localhost:3001', 'http://localhost:3000'],
    origin: ['*'],
    credentials: true
}))

// 接收post参数解析
app.use(koaBody({
    multipart: true,
}))

app.use(async (ctx, next)=>{
    // ctx.set('Access-Control-Allow-Origin','*')
    console.log('全局中间件')
    // ctx.body = 'Hello Wolrd'
    ctx.state.env = ENV
    await next()
})

const certification = require('./controller/certification')
const ownerCertification = require('./controller/ownerCertification')
const wayInfo = require('./controller/wayInfo')
const passenger = require('./controller/passenger')

router.use('/certification', certification.routes())
router.use('/ownerCertification', ownerCertification.routes())
router.use('/wayInfo', wayInfo.routes())
router.use('/passenger', passenger.routes())

app.use(router.routes())
app.use(router.allowedMethods())



app.listen(PORT, ()=>{
    console.log(`服务开启在${PORT}端口`)
})

// MVC