import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import ListVariant from '../../components/ListVariant.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const leftComponent = navigation => {
  return (
    <TouchableOpacity
      style={common.padding(0, 5)}
      onPress={() =>
        navigation.navigate('OrderCreateAddProduct', {
          screen: 'OrderCreateAddVariant',
        })
      }>
      <Icon color="white" name="arrow-left" size={28} />
    </TouchableOpacity>
  );
};

function OrderCreateAddVariant({route, navigation}) {
  const navigationNextFn = (product, variant) => {
    navigation.navigate('OrderCreate', {
      screen: 'OrderCreateAddVariant',
      product,
      variant,
    });
  };

  return (
    <View
      style={common.container(1, 'column', {
        alignItems: 'center',
        backgroundColor: 'white',
      })}>
      <Header name={route.name} leftComponent={leftComponent(navigation)} />

      {/* ------------------- LIST Variant --------------------- */}
      <View
        style={[common.groupWidthHeight('100%', 'row'), common.marginTop(15)]}>
        <ListVariant
          product={route.params.product}
          navigationFn={navigationNextFn}
        />
      </View>
    </View>
  );
}

export default OrderCreateAddVariant;
