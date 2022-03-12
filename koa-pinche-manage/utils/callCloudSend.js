const getAccessToken = require('./getAccessToken.js')
const rp = require('request-promise')

const callCloudSend = async (ctx, params) => {
    const ACCESS_TOKEN = await getAccessToken()
    console.log({
        access_token: ACCESS_TOKEN,
        ...params
    })
    const options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${ACCESS_TOKEN}`,
        body: {
            access_token: ACCESS_TOKEN,
            ...params
        },
        headers: {
            "content-type": "application/json",
        },
        json: true // Automatically stringifies the body to JSON
    }

    return await rp(options)
        .then((res) => {
            return res
        })
        .catch(function (err) {
        })
}

module.exports = callCloudSend