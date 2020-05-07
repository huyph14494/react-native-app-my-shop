import React, {useEffect, useState, memo} from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import {Button} from 'react-native-elements';
import LineItems from '../../components/LineItems.js';
import IconBack from '../../components/IconBack.js';
import {getData, storeData} from '../../helpers/async_storage.js';
import {Picker} from '@react-native-community/picker';
import {CheckBox} from 'react-native-elements';
import ModalCustomItem from '../../components/ModalCustomItem.js';
import {createUUID} from '../../helpers/moment.js';

let dataTmp = {
  item: {},
  action: 1,
  type: 1,
};

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

const Note = memo(({orderData, setOrderData}) => {
  return (
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
          value={orderData.note}
          onChangeText={text => {
            setOrderData({
              ...orderData,
              note: text,
            });
          }}
        />
      </View>
    </View>
  );
});

const Pricing = memo(({orderData, setOrderData, lineItems}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (Array.isArray(lineItems) && lineItems.length) {
      setTotalPrice(
        lineItems.reduce((accumulator, currentValue) => {
          return (
            Number(currentValue.price || 0) *
              Number(currentValue.quantity || 0) +
            accumulator
          );
        }, 0),
      );
    }
  }, [lineItems]);

  return (
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
          <Text style={common.fontSize(16)}>{String(totalPrice)}</Text>
        </View>
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
        <View style={common.picker}>
          <Picker
            selectedValue={orderData.financial_status}
            onValueChange={(itemValue, itemIndex) => {
              setOrderData({
                ...orderData,
                financial_status: itemValue,
              });
            }}>
            <Picker.Item label="Mark As Pending" value="pending" />
            <Picker.Item label="Mark As Paid" value="paid" />
          </Picker>
        </View>
      </View>
    </View>
  );
});

const Items = memo(({navigation, lineItems, setLineItems}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigationNextFn = item => {
    navigation.navigate('OrderCreateEditLineItem', {
      screen: 'OrderCreate',
      data: {item},
    });
  };

  const onActionLineItems = item => {
    dataTmp = {
      item,
      action: 2,
      type: item.hasOwnProperty('sku') ? 2 : 1,
    };
    setModalVisible(true);
  };

  const onActionCustomItem = async (item, action, type) => {
    let lineItemsNew = [];
    if (action === 1) {
      item.id = createUUID();
      if (!item.quantity) {
        item.quantity = 1;
      }
      if (!item.price) {
        item.price = String(0);
      }
      lineItemsNew = [...lineItems, item];
    } else if (action === 2) {
      lineItemsNew = lineItems.map(obj =>
        obj.id === item.id ? {...item} : obj,
      );
    } else if (action === 3) {
      lineItemsNew = lineItems.filter(obj =>
        obj.id !== item.id ? true : false,
      );
    }
    await storeData('@line_items', lineItemsNew);
    setLineItems(lineItemsNew);
  };

  return (
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
          <LineItems
            items={lineItems}
            navigationFn={navigationNextFn}
            onAction={onActionLineItems}
          />
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
            common.marginBottom(10),
          ]}>
          <Button
            title="Add Custom Item"
            type="outline"
            containerStyle={[common.width100Per, common.marginTop(15)]}
            raised={true}
            onPress={() => {
              dataTmp = {
                item: {},
                action: 1,
                type: 1,
              };
              setModalVisible(true);
            }}
          />
        </View>
      </View>
      {/* ------------------------------------------------------ */}
      <ModalCustomItem
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        data={dataTmp}
        onAction={onActionCustomItem}
      />
    </View>
  );
});

const CheckBoxFulfillment = memo(({orderData, setOrderData}) => {
  return (
    <View style={[common.groupWidth(1, 'column')]}>
      <View
        style={[
          common.container(1, 'row', {
            justifyContent: 'flex-start',
            alignItems: 'center',
          }),
          common.padding(0, 10),
        ]}>
        <CheckBox
          title="Mark As Fulfilled"
          checked={orderData.fulfillment_status}
          containerStyle={common.checkBoxElementCustom}
          textStyle={[common.fontWeight('normal'), common.textBold]}
          onPress={() => {
            setOrderData({
              ...orderData,
              fulfillment_status: !orderData.fulfillment_status,
            });
          }}
        />
      </View>
    </View>
  );
});

const OrderCreate = ({route, navigation}) => {
  const [lineItems, setLineItems] = useState([]);
  const [orderData, setOrderData] = useState({
    fulfillment_status: false,
    financial_status: 'pending',
    email: 'foo@example.com',
    is_confirm: true,
    note: '',
  });

  useEffect(() => {
    let getLineItems = async item => {
      let lineItemsNew = await getData('@line_items');

      if (!Array.isArray(lineItemsNew)) {
        lineItemsNew = [];
      }

      if (
        route.params &&
        (!route.params.screen || route.params.screen === 'OrderHome')
      ) {
        if (Array.isArray(lineItemsNew) && lineItemsNew.length) {
          await storeData('@line_items', []);
        }
      } else {
        if (item) {
          let isAdd = true;
          for (let i = 0; i < lineItemsNew.length; i++) {
            if (lineItemsNew[i].id === item.id) {
              lineItemsNew[i].quantity++;
              isAdd = false;
              break;
            }
          }
          if (isAdd) {
            lineItemsNew.push(item);
          }
          await storeData('@line_items', lineItemsNew);
        }
        setLineItems(lineItemsNew);
      }
    };

    let itemNew = route.params?.data?.item ?? null;
    getLineItems(itemNew);
  }, [route.params]);

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
          <Items
            navigation={navigation}
            setLineItems={setLineItems}
            lineItems={lineItems}
          />
          <CheckBoxFulfillment
            orderData={orderData}
            setOrderData={setOrderData}
          />
          {/* ------------------------------------------------------ */}
          <Pricing
            orderData={orderData}
            setOrderData={setOrderData}
            lineItems={lineItems}
          />

          {/* ------------------------------------------------------ */}
          <Note orderData={orderData} setOrderData={setOrderData} />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderCreate;
