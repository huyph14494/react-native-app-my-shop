import React from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductCreate from './ProductCreate';
import ProductHome from './ProductHome';

const ProductContainer = ({route}) => {
  let Stack = route.params.Stack;

  return (
    <Stack.Navigator
      initialRouteName="ProductHome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProductHome" component={ProductHome} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductCreate" component={ProductCreate} />
    </Stack.Navigator>
  );
};

export default ProductContainer;
