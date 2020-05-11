import React, {useEffect, useState, memo, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import {Button, CheckBox} from 'react-native-elements';
import LineItems from '../../components/LineItems.js';
import IconBack from '../../components/IconBack.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {haravan} from '../../apis/haravan/haravan.js';
import SplashScreen from '../SplashScreen/SplashScreen.js';
import {removeData} from '../../helpers/async_storage.js';
import {formatDateTime} from '../../helpers/moment.js';

const rightComponent = onAction => {
  return (
    <TouchableOpacity
      style={[common.padding(8, 18)]}
      onPress={() => {
        onAction();
      }}>
      <Icon color="white" name="check" size={22} />
    </TouchableOpacity>
  );
};

const leftComponent = navigation => {
  return (
    <View>
      <IconBack
        navigation={navigation}
        screenNext={'OrderHome'}
        screenCurrent={'OrderDetail'}
      />
    </View>
  );
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
          common.padding(15, 25),
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

const Pricing = memo(({orderData, setOrderData}) => {
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
          common.padding(10, 25),
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
          <Text style={common.fontSize(16)}>
            {String(orderData.total_price)}
          </Text>
        </View>
      </View>
      <View
        style={[
          common.container(1, 'row', {
            justifyContent: 'flex-start',
            alignItems: 'center',
          }),
          common.padding(0, 25),
          common.marginBottom(20),
        ]}>
        {String(orderData.financial_status)
          .trim()
          .toLowerCase() === 'paid' ? (
          <CheckBox
            title="Paid"
            checked={true}
            containerStyle={[common.labelSuccessCheckBox]}
            checkedColor={'green'}
            textStyle={[
              common.fontWeight('normal'),
              common.textBold,
              common.colorLabelSuccess,
            ]}
          />
        ) : (
          <Button
            title="Mark As Paid"
            containerStyle={[common.width100Per, common.marginTop(15)]}
            raised={true}
            onPress={() => {
              return setOrderData({
                ...orderData,
                financial_status: 'paid',
                isUpdate: true,
              });
            }}
          />
        )}
      </View>
    </View>
  );
});

const Items = memo(({lineItems, orderData, setOrderData}) => {
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
          <LineItems items={lineItems} onAction={() => {}} />
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
          {String(orderData.fulfillment_status)
            .trim()
            .toLowerCase() === 'fulfilled' ? (
            <CheckBox
              title="Fulfilled"
              checked={true}
              containerStyle={[common.labelSuccessCheckBox]}
              checkedColor={'green'}
              textStyle={[
                common.fontWeight('normal'),
                common.textBold,
                common.colorLabelSuccess,
              ]}
            />
          ) : (
            <Button
              title="Mark As Fulfilled"
              containerStyle={[common.width100Per, common.marginTop(15)]}
              raised={true}
              onPress={() => {
                return setOrderData({
                  ...orderData,
                  fulfillment_status: 'fulfilled',
                  isUpdate: true,
                });
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
});

const compareUpdate = (orderOld, orderNew) => {
  let isUpdateApi = false;
  let fieldChange = {
    note: false,
    fulfillment_status: false,
    financial_status: false,
  };
  if (
    orderNew.isNextScreen &&
    String(orderOld.note).trim() !== String(orderNew.note).trim()
  ) {
    isUpdateApi = true;
    fieldChange.note = true;
  }

  if (orderOld.fulfillment_status !== orderNew.fulfillment_status) {
    isUpdateApi = true;
    fieldChange.fulfillment_status = true;
  } else if (orderOld.financial_status !== orderNew.financial_status) {
    isUpdateApi = true;
    fieldChange.financial_status = true;
  }
  return {isUpdateApi, fieldChange};
};

const callApiUpdateOrder = async options => {
  await haravan.delayAPi();
  await haravan.callApi({
    ...options,
    entity: haravan.ENTITY_ORDER,
    whereFn: 'OrderDetail ' + options.action,
  });
};

const OrderDetail = ({route, navigation}) => {
  const orderOld = route.params?.data?.order ?? {};

  const [orderData, setOrderData] = useState({
    ...orderOld,
    isUpdate: false,
    isNextScreen: false,
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (orderData.isUpdate) {
        let updateOrderApi = async () => {
          let {isUpdateApi, fieldChange} = compareUpdate(orderOld, orderData);
          if (isUpdateApi) {
            try {
              if (fieldChange.note) {
                await callApiUpdateOrder({
                  action: haravan.UPDATE_ORDER,
                  id: orderData.id,
                  data: {
                    order: {
                      id: orderData.id,
                      note: orderData.note,
                    },
                  },
                });
              } else if (fieldChange.financial_status) {
                orderOld.financial_status = 'paid';
                await callApiUpdateOrder({
                  action: haravan.UPDATE_ORDER_PAID,
                  id: orderData.id,
                  data: {
                    transaction: {
                      kind: 'capture',
                      send_email: false,
                    },
                  },
                });
              } else if (
                fieldChange.fulfillment_status &&
                orderData.fulfillment_status
              ) {
                orderOld.fulfillment_status = 'fulfilled';
                await callApiUpdateOrder({
                  action: haravan.UPDATE_ORDER_FULFILLED,
                  id: orderData.id,
                  data: {
                    fulfillment: {
                      notify_customer: false,
                    },
                  },
                });
              }

              await removeData('@orders');
            } catch (error) {
              console.log('OrderDetail updateOrderApi', error);
            }
          }

          if (orderData.isNextScreen) {
            navigation.navigate('OrderHome', {
              screen: 'OrderDetail',
              data: {
                message: `${
                  orderData && orderData.order_number
                    ? orderData.order_number
                    : 'The'
                } order has been updated successfully`,
              },
            });
          } else {
            setOrderData({
              ...orderData,
              isUpdate: false,
            });
          }
        };

        updateOrderApi();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData]);

  if (orderData.isUpdate) {
    return <SplashScreen />;
  } else {
    return (
      <View>
        <Header
          name={route.name}
          rightComponent={rightComponent(() => {
            return setOrderData({
              ...orderData,
              isUpdate: true,
              isNextScreen: true,
            });
          })}
          leftComponent={leftComponent(navigation)}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={common.marginBottomHeader}>
          <View
            style={[
              common.container(1, 'column', {alignItems: 'center'}),
              common.marginBottom(15),
            ]}>
            {/* ------------------------------------------------------ */}
            <View
              style={[common.groupWidth(1, 'column'), common.marginTop(15)]}>
              <View
                style={[
                  common.container(1, 'column', {
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }),
                  common.padding(15, 15),
                  common.borderBottom('rgba(0,0,0,.075)', 1),
                ]}>
                <Text style={common.textHeader}>{orderData.order_number}</Text>
              </View>
              <View
                style={[
                  common.container(1, 'column', {
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }),
                  common.padding(0, 25),
                  common.paddingTop(10),
                ]}>
                <Text>Created at: {formatDateTime(orderData.created_at)}</Text>
              </View>
              <View
                style={[
                  common.container(1, 'row', {
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }),
                  common.padding(12, 25),
                ]}>
                {orderData.financial_status === 'paid' ? (
                  <Text style={[common.labelSuccess]}>
                    {orderData.financial_status}
                  </Text>
                ) : (
                  <Text style={[common.labelDanger]}>
                    {orderData.financial_status}
                  </Text>
                )}
                {orderData.fulfillment_status === 'fulfilled' ? (
                  <Text style={[common.labelSuccess, common.marginLeft(15)]}>
                    {orderData.fulfillment_status}
                  </Text>
                ) : (
                  <Text style={[common.labelWarning, common.marginLeft(15)]}>
                    {orderData.fulfillment_status}
                  </Text>
                )}
              </View>
            </View>
            {/* ------------------------------------------------------ */}
            <Items
              lineItems={orderData.line_items}
              setOrderData={setOrderData}
              orderData={orderData}
            />
            {/* ------------------------------------------------------ */}
            <Pricing orderData={orderData} setOrderData={setOrderData} />

            {/* ------------------------------------------------------ */}
            <Note orderData={orderData} setOrderData={setOrderData} />
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default OrderDetail;
