const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");
const cloudStorage = require("../utils/callCloudStorage.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  let query = `
      db.collection('User').where({
        driveStatus: db.command.in([0,1,2]),
      }).skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()
    `;
  if (params.driveStatus !== undefined) {
    // 根据审核状态查询 全部 成功 失败
    query = `
      db.collection('User').where({driveStatus: ${params.driveStatus}}).skip(${params.start}).limit(${params.count}).orderBy('createTime', 'desc').get()
    `;
  }
  const res = await callCloudDB(ctx, "databasequery", query);
  // let zmJszImage = [];
  // let fmJszImage = [];
  // let zmXszImage = [];
  // let fmXszImage = [];
  let image = [];
  const data = res.data || [];
  for (let i = 0, len = data.length; i < len; i++) {
    image.push([{
      fileid: JSON.parse(data[i]).zmJszImage,
      max_age: 7200,
    }, {
      fileid: JSON.parse(data[i]).fmJszImage,
      max_age: 7200,
    }, {
      fileid: JSON.parse(data[i]).zmXszImage,
      max_age: 7200,
    }, {
      fileid: JSON.parse(data[i]).fmXszImage,
      max_age: 7200,
    }, {
      fileid: JSON.parse(data[i]).photo,
      max_age: 7200,
    }]);
  }

  let fileList = [] // [[],[],[]]
  for (let i =0; i < image.length; i++) {
    const { file_list } = await cloudStorage.download(ctx, image[i]);
    fileList.push(file_list)
  }

  let returnData = [];
  for (let i = 0, len = data.length; i < len; i++) {
    let d = JSON.parse(data[i]);
    d.zmJszImage = fileList[i][0].download_url;
    d.fmJszImage = fileList[i][1].download_url;
    d.zmXszImage = fileList[i][2].download_url;
    d.fmXszImage = fileList[i][3].download_url;
    d.photo = fileList[i][4].download_url;
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
      data: { driveStatus: ${params.driveStatus} }
    })
  `;
  const res = await callCloudDB(ctx, "databaseupdate", query);
  ctx.body = {
    code: 20000,
    data: res,
  };
});

module.exports = router;
