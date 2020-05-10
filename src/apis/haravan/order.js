const CREATE_ORDER = 'CREATE_ORDER';
const GET_ORDERS = 'GET_ORDERS';
const UPDATE_ORDER = 'UPDATE_ORDER';
const UPDATE_ORDER_PAID = 'UPDATE_ORDER_PAID';
const UPDATE_ORDER_FULFILLED = 'UPDATE_ORDER_FULFILLED';
const COUNT_ORDERS = 'COUNT_ORDERS';

const orderApi = new Map([
  [GET_ORDERS, {endPoint: () => '/orders.json', method: 'get'}],
  [COUNT_ORDERS, {endPoint: () => '/orders/count.json', method: 'get'}],
  [UPDATE_ORDER, {endPoint: id => `/orders/${id}.json`, method: 'put'}],
  [
    UPDATE_ORDER_PAID,
    {endPoint: id => `/orders/${id}/transactions.json`, method: 'post'},
  ],
  [
    UPDATE_ORDER_FULFILLED,
    {endPoint: id => `/orders/${id}/fulfillments.json`, method: 'post'},
  ],
  [CREATE_ORDER, {endPoint: () => '/orders.json', method: 'post'}],
]);

const getAction = action => {
  return orderApi.get(action);
};

export {
  getAction,
  CREATE_ORDER,
  COUNT_ORDERS,
  GET_ORDERS,
  UPDATE_ORDER,
  UPDATE_ORDER_PAID,
  UPDATE_ORDER_FULFILLED,
};
