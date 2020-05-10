import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyNotification from '../../components/MyNotification.js';

const OrderHome = ({route, navigation}) => {
  return (
    <View>
      <Header name={route.name} />
      <MyNotification />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            common.container(1, 'column', {alignItems: 'center'}),
            common.widthFull,
          ]}>
          {/* ------------------------------------------------------ */}
          <TouchableOpacity
            style={[
              common.group(1, 'row'),
              common.marginTop(15),
              common.borderBottom('rgba(0,0,0,.075)', 1),
            ]}
            onPress={() =>
              navigation.navigate('OrderList', {
                screen: 'OrderHome',
              })
            }>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
                common.padding(15, 15),
              ]}>
              <Icon color="red" name="list" size={28} />
            </View>
            <View
              style={[
                common.container(12, 'column', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(15, 15),
              ]}>
              <Text style={common.textHeader}>All Orders</Text>
            </View>
          </TouchableOpacity>

          {/* ------------------------------------------------------ */}
          <TouchableOpacity
            style={[
              common.group(1, 'row'),
              common.borderBottom('rgba(0,0,0,.075)', 1),
            ]}
            onPress={() =>
              navigation.navigate('OrderCreate', {
                screen: 'OrderHome',
              })
            }>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
                common.padding(15, 15),
              ]}>
              <Icon color="red" name="plus-circle" size={28} />
            </View>
            <View
              style={[
                common.container(12, 'column', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(15, 15),
              ]}>
              <Text style={common.textHeader}>Create Order</Text>
            </View>
          </TouchableOpacity>
          {/* ------------------------------------------------------ */}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHome;
