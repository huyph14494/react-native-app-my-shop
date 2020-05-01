import React from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import {Button} from 'react-native-elements';
import LineItems from '../../components/LineItems.js';
import IconBack from '../../components/IconBack.js';

const leftComponent = navigation => {
  return (
    <IconBack
      navigation={navigation}
      screenNext={'OrderHome'}
      screenCurrent={'OrderCreate'}
    />
  );
};

const onAddProdct = navigation => {
  navigation.navigate('OrderCreateAddProduct', {
    screen: 'OrderCreate',
  });
};

const OrderCreate = ({route, navigation}) => {
  const navigationNextFn = item => {
    navigation.navigate('OrderCreateEditLineItem', {
      screen: 'OrderCreate',
      item,
    });
  };

  let itemNew = route.params?.product ?? null;
  let products = [];
  if (itemNew) {
    products.push(itemNew);
  }

  return (
    <View>
      <Header name={route.name} leftComponent={leftComponent(navigation)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={common.marginBottomHeader}>
        <View
          style={[
            common.container(1, 'column', {alignItems: 'center'}),
            common.marginBottom(15),
          ]}>
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
                <LineItems items={products} navigationFn={navigationNextFn} />
              </View>

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
                  onPress={() => onAddProdct(navigation)}
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
          <View
            style={[
              common.groupWidth(1, 'column'),
              common.marginTop(15),
              common.marginBottom(15),
            ]}>
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
