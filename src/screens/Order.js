import React, {Component} from 'react';
import {TextInput, View, ScrollView} from 'react-native';
import common from '../styles/common.js';
import Header from '../components/Header.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListOrder from '../components/ListOrder.js';

class Order extends Component {
  render() {
    return (
      <View style={common.container(1, 'column', {alignItems: 'center'})}>
        <Header name={this.props.route.name} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ------------------- Filter --------------------- */}
          <View style={common.group(1, 'row', 15)}>
            <View
              style={[
                common.container(7, 'column', {
                  justifyContent: 'center',
                }),
                common.padding(5, 5),
              ]}>
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
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
                common.padding(5, 5),
              ]}>
              <Icon name="plus-circle" size={24} />
            </View>
          </View>

          {/* ------------------- LIST ORDER --------------------- */}
          <View style={common.group(1, 'row', 15)}>
            <ListOrder />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Order;
