const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");
const callCloudSend = require("../utils/callCloudSend.js");
const cloudStorage = require("../utils/callCloudStorage.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  const { region } = params;
  let query = `db.collection('User').skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()`;
  // if(region === 'root') {
  //   query = `db.collection('User').where({
  //     driveStatus: 1,
  //   }).skip(${params.start}).limit(${params.count}).get()`;
  // }
  const res = await callCloudDB(ctx, "databasequery", query);

  ctx.body = {
    code: 20000,
    data: {
      pn: res.pager.Offset + 1,
      total: res.pager.Total,
      data: res.data.map((ele) => JSON.parse(ele)),
    },
  };
});

// router.post("/detail", async (ctx, next) => {
//   const params = ctx.request.body;
//   const { _openid } = params;
//   let query = `db.collection('carOrder')
//     .where({
//       _openid: '${_openid}'
//     }).skip(${params.start}).limit(${params.count}).get()`;
//   const res = await callCloudDB(ctx, "databasequery", query);

//   ctx.body = {
//     code: 20000,
//     data: {
//       pn: res.pager.Offset + 1,
//       total: res.pager.Total,
//       data: res.data.map((ele) => JSON.parse(ele)),
//     },
//   };
// });



module.exports = router;
