import React, {Component} from 'react';
import {View} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import ListProduct from '../../components/ListProduct.js';
import SearchBox from '../../components/SearchBox.js';

const products = [
  {
    id: '1',
    order_number: '#10001',
    financial_status: 'paid',
    fulfillment_status: 'fulfilled',
    created_at: new Date(),
    customer: {
      name: 'Nguyen Van A',
      phone: '123456789',
    },
  },
  {
    id: '2',
    order_number: '#10002',
    financial_status: 'paid',
    fulfillment_status: 'fulfilled',
    created_at: new Date(),
    customer: {
      name: 'Nguyen Van A',
      phone: '123456789',
    },
  },
  {
    id: '3',
    order_number: '#10003',
    financial_status: 'paid',
    fulfillment_status: 'fulfilled',
    created_at: new Date(),
    customer: {
      name: 'Nguyen Van A',
      phone: '123456789',
    },
  },
  {
    id: '4',
    order_number: '#10004',
    financial_status: 'paid',
    fulfillment_status: 'fulfilled',
    created_at: new Date(),
    customer: {
      name: 'Nguyen Van A',
      phone: '123456789',
    },
  },
  {
    id: '5',
    order_number: '#10005',
    financial_status: 'paid',
    fulfillment_status: 'fulfilled',
    created_at: new Date(),
    customer: {
      name: 'Nguyen Van A',
      phone: '123456789',
    },
  },
  {
    id: '6',
    order_number: '#10006',
    financial_status: 'paid',
    fulfillment_status: 'fulfilled',
    created_at: new Date(),
    customer: {
      name: 'Nguyen Van A',
      phone: '123456789',
    },
  },
  {
    id: '7',
    order_number: '#10007',
    financial_status: 'paid',
    fulfillment_status: 'fulfilled',
    created_at: new Date(),
    customer: {
      name: 'Nguyen Van A',
      phone: '123456789',
    },
  },
];

class ProductList extends Component {
  render() {
    return (
      <View
        style={common.container(1, 'column', {
          alignItems: 'center',
        })}>
        <Header name={this.props.route.name} />

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
