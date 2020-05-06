import axios from 'axios';
import * as productApi from './product';

const API_KEY = '9fLel2rtGE5ghAu6uTIN7ebgGVZX-ZFtWXLh0E82F7c';
const BASE_URL = 'https://apis.haravan.com/com';
const ENTITY_PRODUCT = 'PRODUCT';
const ENTITY_ORDER = 'ORDER';
const TIME_OUT = 2000;
const TIME_CACHE_API = 5 * 60000;
const TIME_DELAY_API = 600;
const LIMIT_LIST = 10;

const INSTANCE = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

const delay = t => new Promise(resolve => setTimeout(resolve, t));
const delayAPi = () => delay(TIME_DELAY_API);

const callApi = async ({entity, action, id, params, data, whereFn}) => {
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
    url: apiObj.endPoint(id),
    method: apiObj.method,
    headers: {
      Authorization: 'Bearer ' + API_KEY,
    },
  };

  // method get
  if (params) {
    if (params.hasOwnProperty('query')) {
      if (params.query && String(params.query).trim() !== '') {
        params.query = encodeURIComponent(String(params.query).trim());
      } else {
        delete params.query;
      }
    }
    config.params = params;
  }

  // method post
  if (data) {
    config.data = data;
    config.headers['Content-Type'] = 'application/json';
  }

  try {
    console.log(data);

    await delay(TIME_DELAY_API);
    let response = await INSTANCE(config);
    let now = new Date();
    console.log(
      'callApi',
      entity + ' || ',
      `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} || `,
      'page: ' + (params?.page ?? 0) + ' || ',
      'query: ' + (params?.query ?? 0) + ' || ',
      whereFn,
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
