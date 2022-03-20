const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");
const cloudStorage = require("../utils/callCloudStorage.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  const { name = '', phone = '' } = params;
  let query = `
      db.collection('User').where({
        driveStatus: 1,
      }).skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()
    `;
  if (phone !== '') {
    query = `
      db.collection('User').where({
        driveStatus: 1,
        phone: ${JSON.stringify(phone)}
      }).skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()
    `;
  }
  const res = await callCloudDB(ctx, "databasequery", query);
  console.log(res, 'res')
  let returnData = [];
  const data = res.data || [];
  for (let i = 0, len = data.length; i < len; i++) {
    let d = JSON.parse(data[i]);
    returnData.push(d);
  }
  ctx.body = {
    code: 20000,
    data: {
      pn: res.pager.Offset+1,
      total: res.pager.Total,
      // data: res.data.map((ele) => JSON.parse(ele)),
      data: returnData,
    },
  };
});

router.post("/update", async (ctx, next) => {
  const params = ctx.request.body;
  const { province = '', city='', antd = '' } = params;
  console.log(province, city, antd)
  let query = `
    db.collection('User').doc('${params._id}').update({
      data: { 
        pwd: ${JSON.stringify(params.pwd)},
        province: ${JSON.stringify(province)}, 
        city: ${JSON.stringify(city)}, 
        antd: ${JSON.stringify(antd)}, 
      }
    })
    `;
    // if (province)
    // city: ${params.city && JSON.stringify(params.city) || ''}, 
    // antd: ${params.antd && JSON.stringify(params.antd) || ''},
  const res = await callCloudDB(ctx, "databaseupdate", query);
  console.log(res)
  ctx.body = {
    code: 20000,
    data: res,
  };
});

module.exports = router;
