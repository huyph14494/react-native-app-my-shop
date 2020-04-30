import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';

function leftComponent(navigation) {
  return (
    <TouchableOpacity
      style={common.padding(0, 5)}
      onPress={() =>
        navigation.navigate('OrderHome', {
          screen: 'OrderCreate',
        })
      }>
      <Icon color="white" name="check" size={28} />
    </TouchableOpacity>
  );
}

// function leftComponent(navigation) {
//   return (
//     <TouchableOpacity
//       style={common.padding(0, 5)}
//       onPress={() =>
//         navigation.navigate('ProductHome', {
//           screen: 'ProductCreate',
//         })
//       }>
//       <Icon color="white" name="arrow-left" size={28} />
//     </TouchableOpacity>
//   );
// }

const OrderCreate = ({route, navigation}) => {
  return (
    <View>
      <Header name={route.name} leftComponent={leftComponent(navigation)} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[common.container(1, 'column', {alignItems: 'center'})]}>
          {/* ------------------------------------------------------ */}
          <View style={[common.groupWidth(1, 'column'), common.marginTop(15)]}>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(15, 15),
                common.borderBottom('rgba(0,0,0,.075)', 1),
              ]}>
              <Text style={common.textHeader}>Items</Text>
            </View>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(0, 15),
              ]}>
              <View
                style={[
                  common.container(1, 'row', {
                    justifyContent: 'center',
                    alignItems: 'center',
                  }),
                  common.padding(0, 10),
                ]}>
                <Button
                  title="Add Product"
                  type="solid"
                  containerStyle={[common.width100Per, common.marginTop(15)]}
                  raised={true}
                />
              </View>
              <View
                style={[
                  common.container(1, 'row', {
                    justifyContent: 'center',
                    alignItems: 'center',
                  }),
                  common.padding(0, 10),
                  common.marginBottom(20),
                ]}>
                <Button
                  title="Add Custom Item"
                  type="outline"
                  containerStyle={[common.width100Per, common.marginTop(15)]}
                  raised={true}
                />
              </View>
            </View>
          </View>

          {/* ------------------------------------------------------ */}
          <View style={[common.groupWidth(1, 'column'), common.marginTop(15)]}>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(15, 15),
                common.borderBottom('rgba(0,0,0,.075)', 1),
              ]}>
              <Text style={common.textHeader}>Pricing</Text>
            </View>
            <View
              style={[
                common.container(1, 'row', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(10, 15),
              ]}>
              <View
                style={[
                  common.container(1, 'column', {
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }),
                ]}>
                <Text style={common.fontSize(16)}>Total</Text>
              </View>
              <View
                style={[
                  common.container(1, 'column', {
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }),
                ]}>
                <Text style={common.fontSize(16)}>100.000</Text>
              </View>
            </View>
            <View
              style={[
                common.container(1, 'row', {
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
                common.padding(0, 10),
                common.marginBottom(5),
              ]}>
              <Button
                title="Mark As Pending"
                type="outline"
                containerStyle={[common.width100Per, common.marginTop(15)]}
                raised={true}
              />
            </View>
            <View
              style={[
                common.container(1, 'row', {
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
                common.padding(0, 10),
                common.marginBottom(20),
              ]}>
              <Button
                title="Mark As Paid"
                type="outline"
                containerStyle={[common.width100Per, common.marginTop(15)]}
                raised={true}
              />
            </View>
          </View>

          {/* ------------------------------------------------------ */}
          <View style={[common.groupWidth(1, 'column'), common.marginTop(15)]}>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(15, 15),
                common.borderBottom('rgba(0,0,0,.075)', 1),
              ]}>
              <Text style={common.textHeader}>Note</Text>
            </View>
            <View
              style={[
                common.container(1, 'column', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(15, 15),
              ]}>
              <TextInput
                style={common.textInputNoBorder}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Add Note'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderCreate;
