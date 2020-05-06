import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import common from '../styles/common.js';

function showItems(item, index, navigationFn, product) {
  return (
    <TouchableOpacity onPress={() => navigationFn(product, item)}>
      <View
        key={item.id}
        style={[
          common.group(1, 'column'),
          common.margin(5, 15),
          common.borderBottom('rgba(0,0,0,.075)', 1),
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
            <Text style={common.textBold}>{item.title}</Text>
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
  if (!props.product || !props.product.variants) {
    return <View />;
  } else {
    return (
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={props.product.variants}
        renderItem={({item, index}) =>
          showItems(item, index, props.navigationFn, props.product)
        }
        keyExtractor={item => String(item.id)}
        extraData={props.product.variants}
      />
    );
  }
};

export default ListVariant;
