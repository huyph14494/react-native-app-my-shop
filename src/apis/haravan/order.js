const CREATE_ORDER = 'CREATE_ORDER';

const orderApi = new Map([
  [CREATE_ORDER, {endPoint: () => '/orders.json', method: 'post'}],
]);

const getAction = action => {
  return orderApi.get(action);
};

export {getAction, CREATE_ORDER};
