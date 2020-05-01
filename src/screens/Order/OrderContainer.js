import React from 'react';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import OrderHome from './OrderHome';
import OrderCreate from './OrderCreate';
import OrderCreateAddProduct from './OrderCreateAddProduct';
import OrderCreateAddVariant from './OrderCreateAddVariant';

import {Easing} from 'react-native';

const config = {
  animation: 'timing',
  config: {
    duration: 180,
    easing: Easing.in(Easing.linear),
  },
};

const transitionSpec = {
  open: config,
  close: config,
};

const OrderContainer = ({route, navigation}) => {
  let Stack = route.params.Stack;

  return (
    <Stack.Navigator
      initialRouteName="OrderHome"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="OrderHome"
        component={OrderHome}
        options={{
          transitionSpec,
        }}
      />
      <Stack.Screen
        name="OrderCreate"
        component={OrderCreate}
        options={{
          transitionSpec,
        }}
      />
      <Stack.Screen
        name="OrderCreateAddProduct"
        component={OrderCreateAddProduct}
        options={{
          transitionSpec,
        }}
      />
      <Stack.Screen
        name="OrderCreateAddVariant"
        component={OrderCreateAddVariant}
        options={{
          transitionSpec,
        }}
      />
      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{
          transitionSpec,
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          transitionSpec,
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderContainer;
