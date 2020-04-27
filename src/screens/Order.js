import React, {Component} from 'react';
import {TextInput, View} from 'react-native';
import common from '../styles/common.js';
import Header from '../components/Header.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListOrder from '../components/ListOrder.js';
const orders = [
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

class Order extends Component {
  render() {
    return (
      <View style={common.container(1, 'column', {alignItems: 'center'})}>
        <Header name={this.props.route.name} />

        {/* ------------------- Filter --------------------- */}
        <View style={common.searchBox}>
          <View style={[common.container(8, 'column'), common.padding(5, 5)]}>
            <TextInput style={common.textInput} />
          </View>
          <View
            style={[
              common.container(1, 'column', {
                justifyContent: 'center',
                alignItems: 'center',
              }),
              common.padding(5, 5),
            ]}>
            <Icon name="search" size={24} />
          </View>
        </View>

        {/* ------------------- LIST ORDER --------------------- */}
        <ListOrder orders={orders} />
      </View>
    );
  }
}

export default Order;
