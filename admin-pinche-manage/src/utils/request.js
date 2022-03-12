import request from './fetch'
// import request from './axios'

const getList = async (params = {}) => {
  try {
    const { code, data } = await request('/certification/list', params);
    return data;
  } catch(e) {
    throw Error(e)
  }
}

const updateList = async (params = {}) => {
  try {
    const { code, data } = await request('/certification/update', params, 'post');
    return data;
  } catch(e) {
    throw Error(e)
  }
}

const getCarList = async (params = {}) => {
  try {
    const { code, data } = await request('/ownerCertification/list', params);
    return data;
  } catch(e) {
    throw Error(e)
  }
}

const updateCarList = async (params = {}) => {
  try {
    const { code, data } = await request('/ownerCertification/update', params, 'post');
    return data;
  } catch(e) {
    throw Error(e)
  }
}

const getWayInfoList = async (params = {}) => {
  try {
    const { code, data } = await request('/wayInfo/list', params);
    return data;
  } catch(e) {
    throw Error(e)
  }
}

const updateWayInfoList = async (params = {}) => {
  try {
    const { code, data } = await request('/wayInfo/update', params, 'post');
    return data;
  } catch(e) {
    throw Error(e)
  }
}

const getPassengerList = async (params = {}) => {
  try {
    const { code, data } = await request('/passenger/list', params);
    return data;
  } catch(e) {
    throw Error(e)
  }
}

const getOnlineDriverList = async (params = {}) => {
  try {
    const { code, data } = await request('/passenger/onlinedriver', params, 'post');
    return data;
  } catch(e) {
    throw Error(e)
  }
}

const passengerBindCar = async (params = {}) => {
  try {
    const { code, data } = await request('/passenger/bind', params, 'post');
    return data;
  } catch(e) {
    throw Error(e)
  }
}

export {
  getList,
  updateList,
  getCarList,
  updateCarList,
  getWayInfoList,
  updateWayInfoList,
  getPassengerList,
  getOnlineDriverList,
  passengerBindCar,
}