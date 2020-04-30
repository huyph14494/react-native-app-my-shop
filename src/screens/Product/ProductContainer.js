import React from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductCreate from './ProductCreate';
import ProductHome from './ProductHome';
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

const ProductContainer = ({route}) => {
  let Stack = route.params.Stack;

  return (
    <Stack.Navigator
      initialRouteName="ProductHome"
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="ProductHome"
        component={ProductHome}
        options={{
          transitionSpec,
        }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{
          transitionSpec,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          transitionSpec,
        }}
      />
      <Stack.Screen
        name="ProductCreate"
        component={ProductCreate}
        options={{
          transitionSpec,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductContainer;
