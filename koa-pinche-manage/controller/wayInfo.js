const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");
const cloudStorage = require("../utils/callCloudStorage.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  let query = `
      db.collection('wayInfo').get()
    `;
  const res = await callCloudDB(ctx, "databasequery", query);

  // const data = res.data || [];

  ctx.body = {
    code: 20000,
    data: {
      pn: res.pager.Offset,
      total: res.pager.Total,
      data: res.data.map((ele) => JSON.parse(ele)),
    },
  };
});

router.post("/update", async (ctx, next) => {
  const params = ctx.request.body;

  let query = `
      db.collection('wayInfo').get()
    `;
    const res = await callCloudDB(ctx, "databasequery", query);
    let r;
  if(res.data.length> 0) {
    const _id = JSON.parse(res.data[0])._id;
    const q = `
    db.collection('wayInfo').doc('${_id}').set({
      data: {
        wayInfo: ${JSON.stringify(params.data)}
      }
    })
  `;
    r = await callCloudDB(ctx, "databaseupdate", q);

  } else {
    const q = `
      db.collection('wayInfo').add({
        data: {
          wayInfo: ${JSON.stringify(params.data)}
        }
      })
    `;
    r = await callCloudDB(ctx, 'databaseadd', q)
  }

  ctx.body = {
    code: 20000,
    data: r,
  };
});

module.exports = router;