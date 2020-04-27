import React from 'react';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';

const OrderContainer = ({route}) => {
  let Stack = route.params.Stack;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Order" component={OrderList} />
      <Stack.Screen name="Profile" component={OrderDetail} />
    </Stack.Navigator>
  );
};

export default OrderContainer;
