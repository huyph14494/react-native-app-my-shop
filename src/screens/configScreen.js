import Home from './Home/Home.js';
import OrderContainer from './Order/OrderContainer.js';
import ProductContainer from './Product/ProductContainer.js';

const screenList = [
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
    component: ProductContainer,
    icon: 'tag',
  },
];

const getIsTabBarVisible = route => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params
    ? route.params.screen
    : 'Tab1';

  switch (routeName) {
    case 'ProductDetail':
    case 'OrderDetail':
      return false;
    default:
      return true;
  }
};

export {screenList, getIsTabBarVisible};
