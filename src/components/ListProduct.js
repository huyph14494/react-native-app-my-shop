import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import common from '../styles/common.js';

function showItems(item, index, navigation) {
  let styleFirstItem = {};
  if (index === 0) {
    styleFirstItem = common.marginTopHeader;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetail', {
          screen: 'ProductList',
          product: item,
        })
      }>
      <View
        key={item.id}
        style={[
          common.group(1, 'column'),
          common.margin(5, 15),
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
            <Image
              style={common.tinyLogo}
              source={require('../assets/no-image.jpg')}
            />
          </View>
          <View
            style={[
              common.container(3, 'column', {
                justifyContent: 'center',
                alignItems: 'flex-start',
              }),
            ]}>
            <Text style={common.textBold}>{item.name}</Text>
          </View>
          <View
            style={[
              common.container(1, 'column', {
                justifyContent: 'center',
                alignItems: 'flex-end',
              }),
            ]}>
            <Text>100.000</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const ListProduct = props => {
  return (
    <FlatList
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={props.products}
      renderItem={({item, index}) => showItems(item, index, props.navigation)}
      keyExtractor={item => item.id}
      extraData={props.products}
    />
  );
};

export default ListProduct;
