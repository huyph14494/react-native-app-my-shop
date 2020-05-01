import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import ListProduct from '../../components/ListProduct.js';
import SearchBox from '../../components/SearchBox.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from '../SplashScreen/SplashScreen';

const products = [
  {
    id: '1',
    name: 'Ly Giữ Nhiệt Lock&Lock Swing Tumbler',
    variants: [
      {
        id: '1',
        name: 'aa',
        price: '100.000',
      },
      {
        id: '2',
        name: 'bb',
        price: '200.000',
      },
    ],
  },
  {
    id: '2',
    name:
      'Bình Nước Giữ Nhiệt Lock&Lock City Vacuum Bottle Olympic Montreal (700ml)',
    variants: [
      {
        id: '1',
        name: 'aa',
        price: '100.000',
      },
      {
        id: '2',
        name: 'bb',
        price: '200.000',
      },
    ],
  },
];

const leftComponent = navigation => {
  return (
    <TouchableOpacity
      style={common.padding(0, 5)}
      onPress={() =>
        navigation.navigate('OrderCreate', {
          screen: 'OrderCreateAddProduct',
        })
      }>
      <Icon color="white" name="arrow-left" size={28} />
    </TouchableOpacity>
  );
};

function OrderCreateAddProduct({route, navigation}) {
  const [isLoading, setisLoading] = useState(true);

  const navigationNextFn = product => {
    navigation.navigate('OrderCreateAddVariant', {
      screen: 'OrderCreateAddProduct',
      product,
    });
  };

  if (isLoading) {
    setTimeout(() => {
      setisLoading(false);
    }, 300);
    return <SplashScreen />;
  } else {
    return (
      <View
        style={common.container(1, 'column', {
          alignItems: 'center',
          backgroundColor: 'white',
        })}>
        <Header name={route.name} leftComponent={leftComponent(navigation)} />

        {/* ------------------- Filter --------------------- */}
        <SearchBox />
        {/* ------------------- LIST PRODUCT --------------------- */}
        <View
          style={[
            common.groupWidthHeight('100%', 'row'),
            common.marginTop(15),
          ]}>
          <ListProduct products={products} navigationFn={navigationNextFn} />
        </View>
      </View>
    );
  }
}

export default OrderCreateAddProduct;
