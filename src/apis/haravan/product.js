const GET_PRODUCTS = 'GET_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const COUNT_PRODUCTS = 'COUNT_PRODUCTS';

const productApi = new Map([
  [GET_PRODUCTS, {endPoint: () => '/products.json', method: 'get'}],
  [COUNT_PRODUCTS, {endPoint: () => '/products/count.json', method: 'get'}],
  [UPDATE_PRODUCT, {endPoint: id => `/products/${id}.json`, method: 'put'}],
  [CREATE_PRODUCT, {endPoint: () => '/products.json', method: 'post'}],
]);

const getAction = action => {
  return productApi.get(action);
};

export {
  getAction,
  GET_PRODUCTS,
  COUNT_PRODUCTS,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
};
