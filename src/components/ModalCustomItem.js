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

const validateData = itemSelect => {
  let messError = [];
  if (!itemSelect.title || String(itemSelect.title).trim() === '') {
    messError.push('Title must not be blank!!!');
  }
  if (!itemSelect.sku || String(itemSelect.sku).trim() === '') {
    messError.push('SKU must not be blank!!!');
  }
  if (!itemSelect.price || String(itemSelect.price).trim() === '') {
    messError.push('Price must not be blank!!!');
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

const ModalCustomItem = props => {
  const [itemSelect, setItemSelect] = useState({});
  let action = itemSelect && itemSelect.id ? 2 : 1; // 3: delete, 2: update, 1: create

  useEffect(() => {
    if (props.modalVarVisible) {
      setItemSelect(props.item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.modalVisible]);

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
                    {action === 2 ? 'Update Item' : 'Create Item'}
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
                  <TextInput
                    style={common.textInputNoBorder}
                    underlineColorAndroid={'rgba(0,0,0,.075)'}
                    placeholder={'Title'}
                    value={itemSelect.title || ''}
                    onChangeText={text => {
                      setItemSelect({...itemSelect, title: text});
                    }}
                  />
                  <TextInput
                    style={[common.textInputNoBorder, common.marginTop(15)]}
                    underlineColorAndroid={'rgba(0,0,0,.075)'}
                    placeholder={'Price'}
                    value={itemSelect.price ? String(itemSelect.price) : ''}
                    onChangeText={text => {
                      setItemSelect({...itemSelect, price: text});
                    }}
                  />

                  <Button
                    title={action === 2 ? 'Update' : 'Create'}
                    buttonStyle={common.backgroundRed}
                    containerStyle={[common.width100Per, common.marginTop(15)]}
                    raised={true}
                    onPress={() => {
                      let error = validateData(itemSelect);
                      if (!error) {
                        props.onAction(itemSelect, action);
                        props.setModalVisible(false);
                      }
                    }}
                  />

                  {action === 2 ? (
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
