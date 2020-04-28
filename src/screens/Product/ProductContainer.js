import React from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductCreate from './ProductCreate';

const ProductContainer = ({route}) => {
  let Stack = route.params.Stack;

  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductCreate" component={ProductCreate} />
    </Stack.Navigator>
  );
};

export default ProductContainer;
