import request from './fetch'
// import request from './axios'

// login
export const isLogin = async (params = {}) => {
  try {
    return await request('/login', params, 'post');
    // return data;
  } catch(e) {
    throw Error(e)
  }
}

// province
export const getProvinceList = async (params = {}) => {
  try {
    return await request('/province/list', params);
  } catch(e) {
    throw Error(e)
  }
}
export const updateProvinceList = async (params = {}) => {
  try {
    return await request('/province/update', params, 'post');
  } catch(e) {
    throw Error(e)
  }
}

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

const delCarList = async (id: number) => {
  try {
    const { code, data } = await request(`/ownerCertification/delete/${id}`, {}, 'DELETE');
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
  delCarList,
  getWayInfoList,
  updateWayInfoList,
  getPassengerList,
  getOnlineDriverList,
  passengerBindCar,
}