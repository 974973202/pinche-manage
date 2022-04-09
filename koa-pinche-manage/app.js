const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const cors = require("koa2-cors");
// const koaBody = require("koa-body");
const koajwt = require('koa-jwt')
const bodyparser = require('koa-bodyparser');

const router = new Router();
const ENV = "cloud-prop-0g0aq5yg1035c0c5";
const PORT = 3303;

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});

app.use(bodyparser());

// 跨域
app.use(
  cors({
    // origin: ['http://localhost:9528', 'http://localhost:3001', 'http://localhost:3000'],
    origin: ["*"],
    credentials: true,
  })
);

// 接收post参数解析
// app.use(
//   koaBody({
//     multipart: true,
//   })
// );

app.use(async (ctx, next) => {
  //   ctx.set("Access-Control-Allow-Origin", "*");
  //   ctx.set(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  //   );
  //   ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  //   ctx.state.env = ENV;

  //   if (ctx.method == "OPTIONS") {
  //     ctx.body = 200;
  //   } else {
  //     await next();
  //   }
  console.log("全局中间件");
  ctx.state.env = ENV;
  await next();
});

// 注意：放在路由前面
app.use(koajwt({
    secret: 'Gopal_token'
  }).unless({ // 配置白名单
    path: [/\/login/]
  }))

const login = require("./controller/login");
const areaPublich = require("./controller/areaPublich");
const peopleManager = require("./controller/peopleManager");
// const certification = require("./controller/certification");
const ownerCertification = require("./controller/ownerCertification");
const wayInfo = require("./controller/wayInfo");
const passenger = require("./controller/passenger");
const province = require("./controller/province");
const userInfo = require("./controller/userInfo");

router.use("/login", login.routes());

router.use("/areaPublich", areaPublich.routes());
router.use("/peopleManager", peopleManager.routes());
// router.use("/certification", certification.routes());
router.use("/ownerCertification", ownerCertification.routes());
router.use("/wayInfo", wayInfo.routes());
router.use("/passenger", passenger.routes());
router.use("/province", province.routes());
router.use("/userInfo", userInfo.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`服务开启在${PORT}端口`);
});

// MVC
