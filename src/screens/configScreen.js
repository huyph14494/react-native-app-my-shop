import Home from './Home/Home.js';
import OrderContainer from './Order/OrderContainer.js';
import Product from './Product/Product.js';

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
    component: Product,
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
    case 'OrderDetail':
      return false;
    default:
      return true;
  }
};

export {screenList, getIsTabBarVisible};
