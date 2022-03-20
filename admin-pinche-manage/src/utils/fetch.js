// [fetch]: https://www.cnblogs.com/libin-1/p/6853677.html

// import { Toast } from 'antd-mobile'

/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

/**
 * fetch的请求
 * @param url 请求地址
 * @param data 请求参数
 * @param method 请求方式
 */
export default function request(url = '', data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    method = method.toUpperCase()
    let options = {
      method: method,
      headers: {
        // 'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      // mode: 'no-cors',
      // credentials: 'include',
    }
    if(method === 'GET') {
      const dataStr = obj2String(data);
      dataStr && ( url += '?' + dataStr );
    } else {
      Object.defineProperty(options, 'body', {
        value: JSON.stringify(data)
      })
    }
    let baseUrl;
    if(process.env.NODE_ENV === 'production') {
      baseUrl = process.env.REACT_APP_PRODUCTION_API_URL
    } else if(process.env.NODE_ENV === 'development'){
      baseUrl = process.env.REACT_APP_DEVLOPMENT_API_URL
    }
    // console.log(process.env.NODE_ENV)
    // let baseUrl = 'http://120.77.57.129:3303'
    url = `${baseUrl}${url}`;
    // const req = new Request(url, options)
    // fetch(req)
    fetch(url, options)
      .then((response) => {
        if(response.ok) {
          // console.log(response)
          try {
            return response.json()
          }catch(e) {
            console.log(e)
            return reject(e)
          }
        } else {
          console.error(response)
          // window.href = 'http://localhost:3303/'
          return reject()
          // return Toast.info(`${response.status} ${response.statusText}`)
        }
      })
      .then((response) => {
        return resolve(response)
      })
      .catch((error) => {
        return reject(error)
      })
  })
}

