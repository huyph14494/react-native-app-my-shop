import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import ListProduct from '../../components/ListProduct.js';
import SearchBox from '../../components/SearchBox.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const products = [
  {
    id: '1',
    name: 'Ly Giữ Nhiệt Lock&Lock Swing Tumbler',
  },
  {
    id: '2',
    name:
      'Bình Nước Giữ Nhiệt Lock&Lock City Vacuum Bottle Olympic Montreal (700ml)',
  },
  {
    id: '3',
    name: 'Thùng 24 Lon Nước ngọt có ga Coca-Cola Plus lon ( 330ml x24)',
  },
  {
    id: '4',
    name: 'Lốc 24 Lon Nước Tăng Lực Monster Energy',
  },
  {
    id: '5',
    name: 'Điện Thoại Vsmart Joy 2+',
  },
  {
    id: '6',
    name: 'Thùng 24 Lon Nước ngọt có ga Coca-Cola Plus lon ( 330ml x24)',
  },
  {
    id: '7',
    name: 'Thùng 24 Lon Nước ngọt có ga Coca-Cola Plus lon ( 330ml x24)',
  },
  {
    id: '8',
    name: 'Thùng 24 Lon Nước ngọt có ga Coca-Cola Plus lon ( 330ml x24)',
  },
  {
    id: '9',
    name: 'Thùng 24 Lon Nước ngọt có ga Coca-Cola Plus lon ( 330ml x24)',
  },
  {
    id: '10',
    name: 'Thùng 24 Lon Nước ngọt có ga Coca-Cola Plus lon ( 330ml x24)',
  },
];

class ProductList extends Component {
  leftComponent = () => {
    return (
      <TouchableOpacity
        style={common.padding(0, 5)}
        onPress={() =>
          this.props.navigation.navigate('ProductCreate', {
            screen: 'ProductList',
          })
        }>
        <Icon color="white" name="plus-circle" size={28} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={common.container(1, 'column', {
          alignItems: 'center',
        })}>
        <Header
          name={this.props.route.name}
          leftComponent={this.leftComponent()}
        />

        {/* ------------------- Filter --------------------- */}
        <SearchBox />
        {/* ------------------- LIST PRODUCT --------------------- */}
        <View
          style={[
            common.groupWidthHeight('100%', 'row', 15),
            common.marginTop(15),
          ]}>
          <ListProduct products={products} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

export default ProductList;
