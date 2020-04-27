import React from 'react';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';

const OrderContainer = ({route}) => {
  let Stack = route.params.Stack;

  return (
    <Stack.Navigator
      initialRouteName="OrderList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
};

export default OrderContainer;
