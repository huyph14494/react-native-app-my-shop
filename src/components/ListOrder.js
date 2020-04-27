import React from 'react';
import {View, Text, FlatList} from 'react-native';
import common from '../styles/common.js';
import {formatDateTime} from '../helpers/moment';

function showItems(item, index) {
  let styleFirstItem = {};
  if (index === 0) {
    styleFirstItem = common.marginTopHeader;
  }

  return (
    <View
      key={item.id}
      style={[
        common.group(1, 'column'),
        common.margin(5, 5),
        common.borderBottom('rgba(0,0,0,.075)', 1),
        styleFirstItem,
      ]}>
      <View style={[common.group(1, 'row'), common.padding(5, 5)]}>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-start',
            }),
          ]}>
          <Text style={common.textHeader}>{item.order_number}</Text>
        </View>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-end',
            }),
          ]}>
          <Text style={common.labelWarning}>{item.financial_status}</Text>
        </View>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-end',
            }),
          ]}>
          <Text style={common.labelDanger}>{item.fulfillment_status}</Text>
        </View>
      </View>
      <View
        style={[
          common.group(1, 'row'),
          common.padding(5, 5),
          common.marginBottom(10),
        ]}>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-start',
            }),
          ]}>
          <Text>{formatDateTime(new Date())}</Text>
        </View>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-end',
            }),
          ]}>
          <Text style={common.textHeader}>100.000</Text>
        </View>
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
