const Router = require('koa-router')
const router = new Router()
const callCloudDB = require("../utils/callCloudDB.js");
const cloudStorage = require("../utils/callCloudStorage.js");
const crypto = require("crypto"),
jwt = require("jsonwebtoken");

router.post('/', async(ctx, next)=>{
  const { phone, password } = ctx.request.body
  if(phone === '18888888888') {
    if(password === 'fengzhengkeji') {
      const token = jwt.sign(
        {
          phone: '18888888888'
        },
        "Gopal_token", // secret
        { expiresIn: 60 * 60 * 60 } // 60 * 60 s
      );
      ctx.body = {
        code: 20000,
        msg: '登陆成功',
        data: {
          token,
          phone,
          isAuth: 'root',
        },
      };
    } else {
      ctx.body = {
        code: 40003,
        msg: '密码错误',
        data: {},
      };
    }
  } else {
    // 查User库
    let query = `
    db.collection('User').where({
      phone: ${JSON.stringify(phone)}
    }).get()
    `;
    const { errcode, errmsg, data = [] } = await callCloudDB(ctx, "databasequery", query);
    if(data.length <= 0 || JSON.parse(data).length <= 0) {
      ctx.body = {
        code: 40003,
        msg: '账号不存在',
        data: {},
      };
    }else {
      const {pwd, phone: p, province, city, antd} = JSON.parse(data)
      if (pwd && pwd == password) {
        const token = jwt.sign(
          {
            phone: p
          },
          "Gopal_token", // secret
          { expiresIn: 60 * 60 * 60 } // 60 * 60 s
        );
        ctx.body = {
          code: 20000,
          msg: '登陆成功',
          data: {
            token,
            phone,
            province,
            city,
            antd,
            isAuth: 'user'
          },
        };
      } else {
        ctx.body = {
          code: 40003,
          msg: '密码错误',
          data: {},
        };
      }
    }
  }
})

module.exports = router

