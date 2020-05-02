const GET_PRODUCTS = 'GET_PRODUCTS';

const productApi = new Map([
  [GET_PRODUCTS, {endPoint: '/products.json', method: 'get'}],
]);

const getAction = action => {
  return productApi.get(action);
};

export {getAction, GET_PRODUCTS};
