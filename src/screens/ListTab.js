import Home from './Home/Home.js';
import OrderContainer from './Order/OrderContainer.js';
import Product from './Product/Product.js';

export default [
  {
    name: 'Home',
    component: Home,
    icon: 'home',
  },
  {
    name: 'Order',
    component: OrderContainer,
    icon: 'format-list-checks',
  },
  {
    name: 'Product',
    component: Product,
    icon: 'tag',
  },
];
