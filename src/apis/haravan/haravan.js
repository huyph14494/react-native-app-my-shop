import axios from 'axios';
import * as productApi from './product';

const API_KEY = '9fLel2rtGE5ghAu6uTIN7ebgGVZX-ZFtWXLh0E82F7c';
const BASE_URL = 'https://apis.haravan.com/com/';
const ENTITY_PRODUCT = 'PRODUCT';
const ENTITY_ORDER = 'ORDER';
const TIME_OUT = 2000;

const INSTANCE = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

const callApi = async ({entity, action, params, data}) => {
  let apiObj = null;

  switch (entity) {
    case ENTITY_PRODUCT:
      apiObj = productApi.getAction(action);
      break;
  }

  if (!apiObj) {
    return new Error('Not found entity API');
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

  INSTANCE(config)
    .then(function(response) {
      // handle success
      console.log('callApi', response);
      return response;
    })
    .catch(function(error) {
      // handle error
      console.log('callApi', error);
      return new Error('callApi: ' + error);
    });
};

const haravan = {...callApi, ...productApi};
export {haravan};
