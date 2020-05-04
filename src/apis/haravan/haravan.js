import axios from 'axios';
import * as productApi from './product';

const API_KEY = '9fLel2rtGE5ghAu6uTIN7ebgGVZX-ZFtWXLh0E82F7c';
const BASE_URL = 'https://apis.haravan.com/com';
const ENTITY_PRODUCT = 'PRODUCT';
const ENTITY_ORDER = 'ORDER';
const TIME_OUT = 2000;
const TIME_CACHE_API = 5 * 60000;
const LIMIT_LIST = 10;

const INSTANCE = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

const delayAPi = t => new Promise(resolve => setTimeout(resolve, t));

const callApi = async ({entity, action, params, data}) => {
  let apiObj = null;

  switch (entity) {
    case ENTITY_PRODUCT:
      apiObj = productApi.getAction(action);
      break;
  }

  if (!apiObj) {
    throw new Error('Not found entity API');
  }

  let config = {
    url: apiObj.endPoint,
    method: apiObj.method,
    headers: {
      Authorization: 'Bearer ' + API_KEY,
    },
  };

  // method get
  if (params) {
    config.params = params;
  }

  // method post
  if (data) {
    config.data = data;
    config.headers['Content-Type'] = 'application/json';
  }

  try {
    await delayAPi(1000);
    let response = await INSTANCE(config);
    let now = new Date();
    console.log(
      'callApi',
      entity,
      `${now.getHours()}:${now.getMinutes()}`,
      params,
    );
    return response.data;
  } catch (error) {
    console.log('callApi', error);
    throw new Error('callApi: ' + error);
  }
};

const haravan = {
  callApi,
  delayAPi,
  ENTITY_PRODUCT,
  ENTITY_ORDER,
  TIME_CACHE_API,
  LIMIT_LIST,
  ...productApi,
};
export {haravan};
