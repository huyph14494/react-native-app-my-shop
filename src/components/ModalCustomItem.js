import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import common from '../styles/common';
import {Button} from 'react-native-elements';
import NumbericeInput from './NumbericInput.js';

const validateData = itemSelect => {
  let messError = [];
  if (!itemSelect.title || String(itemSelect.title).trim() === '') {
    messError.push('Title must not be blank!!!');
  }
  if (!itemSelect.price || String(itemSelect.price).trim() === '') {
  } else {
    if (Number.isNaN(itemSelect.price) || isNaN(itemSelect.price)) {
      messError.push('Price must be a number!!!');
    }
  }

  messError = messError.join(' \n ');
  if (messError) {
    Alert.alert(
      //title
      'Warning',
      //body
      messError,
      [{text: 'Yes'}],
      {cancelable: true},
      //clicking out side of alert will not cancel
    );
  }

  return messError ? true : false;
};

// Action 1: create, 2 update, 3 delete
// Type: 1: custom, 2: variant
const ModalCustomItem = props => {
  const [itemSelect, setItemSelect] = useState({});

  const onActionNumberic = value => {
    setItemSelect({...itemSelect, quantity: value});
  };

  useEffect(() => {
    if (props.modalVisible && props.data && props.data.item) {
      setItemSelect({...props.data.item});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data.item, props.modalVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVisible(false);
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={common.height('100%')}>
          <TouchableWithoutFeedback>
            <View style={[common.modalView]}>
              {/* ------------------------------------------------------ */}
              <View style={[common.group(1, 'column'), common.width100Per]}>
                <View
                  style={[
                    common.container(1, 'column', {
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }),
                    common.padding(5, 15),
                    common.borderBottom('rgba(0,0,0,.075)', 1),
                  ]}>
                  <Text style={common.textHeader}>
                    {props.data.action === 2 ? 'Update Item' : 'Create Item'}
                  </Text>
                </View>

                <View
                  style={[
                    common.container(1, 'column', {
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }),
                    common.padding(15, 15),
                  ]}>
                  <Text style={[common.marginTop(10), common.textBold]}>
                    Title:{' '}
                    {props.data.type === 2 ? itemSelect.title || '' : null}
                  </Text>

                  {props.data.type === 1 ? (
                    <TextInput
                      style={common.textInputNoBorder}
                      underlineColorAndroid={'rgba(0,0,0,.075)'}
                      value={itemSelect.title || ''}
                      onChangeText={text => {
                        setItemSelect({...itemSelect, title: text});
                      }}
                    />
                  ) : null}

                  {props.data.type === 2 ? (
                    <Text style={[common.marginTop(10), common.textBold]}>
                      Sku: {itemSelect.sku || ''}
                    </Text>
                  ) : null}

                  <Text style={[common.marginTop(10), common.textBold]}>
                    Price:{' '}
                    {props.data.type === 2 ? itemSelect.price || '0' : null}
                  </Text>

                  {props.data.type === 1 ? (
                    <TextInput
                      style={[common.textInputNoBorder]}
                      underlineColorAndroid={'rgba(0,0,0,.075)'}
                      value={itemSelect.price ? String(itemSelect.price) : ''}
                      onChangeText={text => {
                        setItemSelect({...itemSelect, price: text});
                      }}
                    />
                  ) : null}

                  <Text style={[common.marginTop(10), common.textBold]}>
                    Quantity:
                  </Text>
                  <NumbericeInput
                    styleContainer={common.margin(12, 0)}
                    onAction={onActionNumberic}
                    initData={itemSelect.quantity || 1}
                  />
                  <Button
                    title={props.data.action === 2 ? 'Update' : 'Create'}
                    buttonStyle={common.backgroundRed}
                    containerStyle={[common.width100Per, common.marginTop(10)]}
                    raised={true}
                    onPress={() => {
                      let error = validateData(itemSelect);
                      if (!error) {
                        props.onAction(
                          itemSelect,
                          props.data.action,
                          props.data.type,
                        );
                        props.setModalVisible(false);
                      }
                    }}
                  />

                  {props.data.action === 2 ? (
                    <Button
                      title={'Delete'}
                      containerStyle={[
                        common.width100Per,
                        common.marginTop(15),
                      ]}
                      raised={true}
                      onPress={() => {
                        props.onAction(itemSelect, 3);
                        props.setModalVisible(false);
                      }}
                    />
                  ) : (
                    <View />
                  )}

                  <Button
                    title="Close"
                    type="outline"
                    containerStyle={[common.width100Per, common.marginTop(15)]}
                    raised={true}
                    onPress={() => {
                      props.setModalVisible(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalCustomItem;
