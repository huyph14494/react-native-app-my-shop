const CREATE_ORDER = 'CREATE_ORDER';
const GET_ORDERS = 'GET_ORDERS';

const orderApi = new Map([
  [GET_ORDERS, {endPoint: () => '/orders.json', method: 'get'}],
  [CREATE_ORDER, {endPoint: () => '/orders.json', method: 'post'}],
]);

const getAction = action => {
  return orderApi.get(action);
};

export {getAction, CREATE_ORDER, GET_ORDERS};
