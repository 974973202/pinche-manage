const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");
const callCloudSend = require("../utils/callCloudSend.js");
const cloudStorage = require("../utils/callCloudStorage.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  let query = `db.collection('carOrderRegion').skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()`;
  const { data } = await callCloudDB(ctx, "databasequery", query);
  const {_id, ...rest} = JSON.parse(data);
  console.log(rest);
  ctx.body = {
    code: 20000,
    data: rest,
  };
});

router.post("/detail", async (ctx, next) => {
  const params = ctx.request.body;
  const { _openid } = params;
  let query = `db.collection('carOrder')
    .where({
      _openid: '${_openid}'
    }).get()`;
  const res = await callCloudDB(ctx, "databasequery", query);

  ctx.body = {
    code: 20000,
    data: {
      pn: res.pager.Offset,
      total: res.pager.Total,
      data: res.data.map((ele) => JSON.parse(ele)),
    },
  };
});



module.exports = router;