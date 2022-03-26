const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");
const cloudStorage = require("../utils/callCloudStorage.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  let query = `
      db.collection('User').skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()
    `;
  if (params.status !== undefined) { // 根据审核状态查询
    query = `
      db.collection('User').where({status: ${params.status}}).skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()
    `;
  }
  const res = await callCloudDB(ctx, "databasequery", query);

  let zmSfzImage = [];
  let fmSfzImage = [];
  const data = res.data || [];
  for (let i = 0, len = data.length; i < len; i++) {
    zmSfzImage.push({
      fileid: JSON.parse(data[i]).zmSfzImage,
      max_age: 7200,
    });
    fmSfzImage.push({
      fileid: JSON.parse(data[i]).fmSfzImage,
      max_age: 7200,
    });
  }

  const { file_list: zmSfz } = await cloudStorage.download(ctx, zmSfzImage);
  const { file_list: fmSfz } = await cloudStorage.download(ctx, fmSfzImage);
  let returnData = [];
  for (let i = 0, len = data.length; i < len; i++) {
    let d = JSON.parse(data[i]);
    d.zmSfzImage = zmSfz[i].download_url;
    d.fmSfzImage = fmSfz[i].download_url;
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
  const query = `
    db.collection('User').doc('${params._id}').update({
      data: { status: ${params.status} }
    })
  `;
  const res = await callCloudDB(ctx, "databaseupdate", query);
  ctx.body = {
    code: 20000,
    data: res,
  };
});

module.exports = router;
