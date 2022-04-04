const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");
const callCloudSend = require("../utils/callCloudSend.js");
const cloudStorage = require("../utils/callCloudStorage.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  const { region } = params;
  let query = `db.collection('carOrderRegion').get()`;
  const { data } = await callCloudDB(ctx, "databasequery", query);
  let result = {}
  if(region === 'root') {
    const {_id, ...rest} = JSON.parse(data);
    result = rest
  } else {
    result = JSON.parse(data)[region]
  }
  ctx.body = {
    code: 20000,
    data: result,
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