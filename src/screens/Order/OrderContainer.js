import React from 'react';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import OrderHome from './OrderHome';
import OrderCreate from './OrderCreate';

const OrderContainer = ({route}) => {
  let Stack = route.params.Stack;

  return (
    <Stack.Navigator
      initialRouteName="OrderHome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OrderHome" component={OrderHome} />
      <Stack.Screen name="OrderCreate" component={OrderCreate} />
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
};

export default OrderContainer;
