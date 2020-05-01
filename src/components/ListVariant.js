import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import common from '../styles/common.js';

function showItems(item, index, navigationFn, product) {
  let styleFirstItem = {};
  if (index === 0) {
    styleFirstItem = common.marginTopHeader;
  }

  return (
    <TouchableOpacity onPress={() => navigationFn(product, item)}>
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
            <Text style={common.textBold}>{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const ListVariant = props => {
  return (
    <FlatList
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={props.product.variants}
      renderItem={({item, index}) =>
        showItems(item, index, props.navigationFn, props.product)
      }
      keyExtractor={item => item.id}
      extraData={props.product.variants}
    />
  );
};

export default ListVariant;
