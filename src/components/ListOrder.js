import React from 'react';
import {View, Text, FlatList, TextInput} from 'react-native';
import common from '../styles/common.js';
const MARGIN_HEADER = 60;

function showItems(item, index) {
  let styleFirstItem = {};
  if (index === 0) {
    styleFirstItem = {marginTop: MARGIN_HEADER};
  }

  return (
    <View
      key={item.id}
      style={[
        common.group(1, 'row', 15, false),
        common.padding(5, 5),
        common.borderBottom('rgba(0,0,0,.075)', 1),
        styleFirstItem,
      ]}>
      <View
        style={[
          common.container(1, 'column', {
            justifyContent: 'center',
            alignItems: 'flex-start',
          }),
          common.padding(5, 5),
        ]}>
        <Text>{index}</Text>
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
      renderItem={({item, index}) => showItems(item, index)}
      keyExtractor={item => item.id}
      extraData={props.orders}
    />
  );
};

export default ListOrder;
