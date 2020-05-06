const GET_PRODUCTS = 'GET_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const productApi = new Map([
  [
    GET_PRODUCTS,
    {
      endPoint: () => '/products.json',
      method: 'get',
    },
  ],
  [UPDATE_PRODUCT, {endPoint: id => `/products/${id}.json`, method: 'put'}],
]);

const getAction = action => {
  return productApi.get(action);
};

export {getAction, GET_PRODUCTS, UPDATE_PRODUCT};
