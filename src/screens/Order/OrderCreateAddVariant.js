import React from 'react';
import {View} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import ListVariant from '../../components/ListVariant.js';
import IconBack from '../../components/IconBack.js';

const leftComponent = navigation => {
  return (
    <IconBack
      navigation={navigation}
      screenNext={'OrderCreateAddProduct'}
      screenCurrent={'OrderCreateAddVariant'}
    />
  );
};

function OrderCreateAddVariant({route, navigation}) {
  const navigationNextFn = (product, variant) => {
    let item = {
      id: `${product.id}_${variant.id}`,
      title: product.title,
      title_variant: variant.title,
      sku: variant.sku,
      price: variant.price,
      product_id: product.id,
      variant_id: variant.id,
      quantity: 1,
    };

    navigation.navigate('OrderCreate', {
      screen: 'OrderCreateAddVariant',
      data: {item},
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
          product={route.params?.data?.product ?? []}
          navigationFn={navigationNextFn}
        />
      </View>
    </View>
  );
}

export default OrderCreateAddVariant;
