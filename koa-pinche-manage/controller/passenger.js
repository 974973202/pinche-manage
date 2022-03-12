const Router = require("koa-router");
const router = new Router();
const callCloudDB = require("../utils/callCloudDB.js");
const callCloudSend = require("../utils/callCloudSend.js");
const cloudStorage = require("../utils/callCloudStorage.js");

router.get("/list", async (ctx, next) => {
  const params = ctx.request.query;
  const { endRegion = '', startRegion='', status } = params;
  console.log('endRegion', endRegion)
  console.log('startRegion', startRegion)
  console.log('status', status)
  let query = `
      db.collection('PassengerPublish').skip(${params.start}).limit(${params.count}).orderBy('createdTime', 'desc').get()
      `;
      if(status !== undefined && endRegion && startRegion) {
        query = `
      db.collection('PassengerPublish').where({
        startRegion: ${JSON.stringify(startRegion)},
        endRegion: ${JSON.stringify(endRegion)},
        status: ${JSON.stringify(status)},
      }).skip(${params.start}).limit(${params.count}).orderBy('createdTime', 'desc').get()
      `;
      } else if (endRegion && startRegion) {
        query = `
      db.collection('PassengerPublish').where({
        startRegion: ${JSON.stringify(startRegion)},
        endRegion: ${JSON.stringify(endRegion)},
      }).skip(${params.start}).limit(${params.count}).orderBy('createdTime', 'desc').get()
      `;
      } else if (status !== undefined && status !== '') {
        query = `
      db.collection('PassengerPublish').where({
        status: ${status},
      }).skip(${params.start}).limit(${params.count}).orderBy('createdTime', 'desc').get()
      `;
      }

  const res = await callCloudDB(ctx, "databasequery", query);
  ctx.body = {
    code: 20000,
    data: {
      pn: res.pager.Offset+1,
      total: res.pager.Total,
      data: res.data.map((ele) => JSON.parse(ele)),
    },
  };
});

router.post("/onlinedriver", async (ctx, next) => {
  const params = ctx.request.body;
  const { startRegion, endRegion, exactDate, dateIndex, peopleNumber } = params;
  let query = `
      db.collection('CarPublish').where({
        startRegion: ${JSON.stringify(startRegion)},
        endRegion: ${JSON.stringify(endRegion)},
        dateIndex: ${JSON.stringify(dateIndex)},
        exactDate: db.command.lt(${exactDate}),
        status: 1,
      }).get()
      `;
      // peopleNumber: db.command.lte(${peopleNumber}),
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

router.post("/update", async (ctx, next) => {
  const params = ctx.request.body;
  const query = `
    db.collection('PassengerPublish').doc('${params._id}').update({
      data: { carInfo: ${params.carInfo} }
    })
  `;
  const res = await callCloudDB(ctx, "databaseupdate", query);
  ctx.body = {
    code: 20000,
    data: res,
  };
});

router.post('/bind', async (ctx, next) => {
  const params = ctx.request.body;
  const { cid, pid, peopleNumber, puserInfo, cuserInfo } = params
  // 修改车主数据
  const cquery = `
    db.collection('CarPublish').doc('${cid}').update({
      data: {
        passengerInfo: db.command.push(${JSON.stringify(puserInfo)}),
        peopleNumber: ${peopleNumber},
      }
    })
  `;
  const cres = await callCloudDB(ctx, "databaseupdate", cquery);
  // 修改乘客数据
  const pquery = `
    db.collection('PassengerPublish').doc('${pid}').update({
      data: {
        carInfo: db.command.push(${JSON.stringify(cuserInfo)}),
        status: 4,
      }
    })
  `;
  const pres = await callCloudDB(ctx, "databaseupdate", pquery);

  const { popenid, exactDate, copenid, startLocation, endLocation } = params;

  // 通知乘客订阅
  const cSend = {
    touser: popenid, // 获取乘客openid
    page: '/pages/myCenter/myCenter',
    lang: 'zh_CN',
    data: {
      thing1: { // 车主
        value: cuserInfo.name
      },
      thing2: { // 出发地
        value: startLocation
      },
      thing3: { // 目的地
        value: endLocation
      },
      time4: { // 发车时间
        value: exactDate
      },
      phone_number5: { // 车主电话
        value: cuserInfo.phone
      }
    },
    template_id: 'vTBYeIGWH0DtZcFaq0SgisgU6y_LWAEMS5XZpix2OYA',
    miniprogram_state: 'trial'
  }
  const csend = await callCloudSend(ctx, cSend);

// 通知车主订阅
  const pSend = {
    touser: copenid,
    page: '/pages/myCenter/myCenter',
    lang: 'zh_CN',
    data: {
      thing1: { // 预约用户
        value: puserInfo.name
      },
      phone_number2: { // 联系方式
        value: puserInfo.phone
      },
      thing3: { // 始发地
        value: startLocation
      },
      thing4: { // 目的地
        value: endLocation
      },
      time5: { // 预约时间
        value: exactDate
      }
    },
    template_id: 'nLY1ZuV01mAGSp9stU3gmYSpejgQ_DtQHoqPW8yltcg',
    miniprogram_state: 'trial'
  }
  const psend = await callCloudSend(ctx, pSend);



  ctx.body = {
    code: 20000,
    data: [
      pres,
      cres,
    ],
  };
})

module.exports = router;
