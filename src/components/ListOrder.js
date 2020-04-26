import React from 'react';
import {View, Text, FlatList, TextInput} from 'react-native';
import common from '../styles/common.js';

function showItems(item) {
  return (
    <View
      key={item.id}
      style={[
        common.group(1, 'row', 15, false),
        common.padding(35, 5),
        common.borderBottom('rgba(0,0,0,.075)', 1),
      ]}>
      <View
        style={[
          common.container(1, 'column', {
            justifyContent: 'center',
            alignItems: 'flex-start',
          }),
          common.padding(5, 5),
        ]}>
        <Text>{item.order_number}</Text>
        <Text>{item.financial_status}</Text>
        <Text>{item.fulfillment_status}</Text>
      </View>
      <View
        style={[
          common.container(1, 'column', {
            justifyContent: 'center',
            alignItems: 'flex-end',
          }),
          common.padding(5, 5),
        ]}>
        <Text>{item.order_number}</Text>
        <Text>{item.financial_status}</Text>
        <Text>{item.fulfillment_status}</Text>
      </View>
    </View>
  );
}

const ListOrder = props => {
  return (
    <FlatList
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={props.orders}
      renderItem={({item}) => showItems(item)}
      keyExtractor={item => item.id}
      extraData={props.orders}
    />
  );
};

export default ListOrder;
