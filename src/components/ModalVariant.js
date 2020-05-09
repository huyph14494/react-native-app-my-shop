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

const validateData = variant => {
  let messError = [];
  if (!variant.title || String(variant.title).trim() === '') {
    messError.push('Title must not be blank!!!');
  }
  if (!variant.sku || String(variant.sku).trim() === '') {
    messError.push('SKU must not be blank!!!');
  }
  if (!variant.price || String(variant.price).trim() === '') {
    messError.push('Price must not be blank!!!');
  } else {
    if (Number.isNaN(variant.price) || isNaN(variant.price)) {
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

const ModalVariant = props => {
  const [variant, setVariant] = useState({});
  let action = variant && variant.id ? 2 : 1; // 3: delete, 2: update, 1: create

  useEffect(() => {
    if (props.modalVarVisible) {
      setVariant(props.item);
    }
  }, [props.item, props.modalVarVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVarVisible}
      onRequestClose={() => {
        props.setModalVarVisible(false);
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVarVisible(false);
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
                    {action === 2 ? 'Update Variant' : 'Create Variant'}
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
                  <Text style={[common.marginTop(10)]}>Title:</Text>
                  <TextInput
                    style={common.textInputNoBorder}
                    underlineColorAndroid={'rgba(0,0,0,.075)'}
                    value={variant.title || ''}
                    onChangeText={text => {
                      setVariant({...variant, title: text});
                    }}
                  />
                  <Text style={[common.marginTop(10)]}>Sku:</Text>
                  <TextInput
                    style={[common.textInputNoBorder]}
                    underlineColorAndroid={'rgba(0,0,0,.075)'}
                    value={variant.sku || ''}
                    onChangeText={text => {
                      setVariant({...variant, sku: text});
                    }}
                  />
                  <Text style={[common.marginTop(10)]}>Price:</Text>
                  <TextInput
                    style={[common.textInputNoBorder]}
                    underlineColorAndroid={'rgba(0,0,0,.075)'}
                    value={variant.price ? String(variant.price) : ''}
                    onChangeText={text => {
                      setVariant({...variant, price: text});
                    }}
                  />

                  <Button
                    title={action === 2 ? 'Update' : 'Create'}
                    buttonStyle={common.backgroundRed}
                    containerStyle={[common.width100Per, common.marginTop(15)]}
                    raised={true}
                    onPress={() => {
                      let error = validateData(variant);
                      if (!error) {
                        props.onAction(variant, action);
                        props.setModalVarVisible(false);
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
                        props.onAction(variant, 3);
                        props.setModalVarVisible(false);
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
                      props.setModalVarVisible(false);
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

export default ModalVariant;
