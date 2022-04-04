import request from './fetch'

export const postRequest = async (url, params = {}) => {
  try {
    return await request(url, params, 'post');
  } catch(e) {
    throw Error(e)
  }
}

export const getRequest = async (url, params = {}) => {
  try {
    return await request(url, params);
  } catch(e) {
    throw Error(e)
  }
}