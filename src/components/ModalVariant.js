import React, {useState, useEffect} from 'react';
import {View, Text, Modal, Alert, ScrollView, TextInput} from 'react-native';
import common from '../styles/common';
import {Button} from 'react-native-elements';

const ModalVariantCreate = props => {
  const [variant, setVariant] = useState({});
  let action = variant && variant.id ? 2 : 1; // 2: update, 1: create

  useEffect(() => {
    setVariant(props.item);
  }, [props.item]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVarVisible}
      onRequestClose={() => {
        props.setModalVarVisible(false);
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <TextInput
                style={common.textInputNoBorder}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Title'}
                value={variant.title || ''}
                onChangeText={text => {
                  setVariant({...variant, title: text});
                }}
              />
              <TextInput
                style={[common.textInputNoBorder, common.marginTop(15)]}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Sku'}
                value={variant.sku || ''}
                onChangeText={text => {
                  setVariant({...variant, sku: text});
                }}
              />
              <TextInput
                style={[common.textInputNoBorder, common.marginTop(15)]}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Price'}
                value={variant.price ? String(variant.price) : ''}
                onChangeText={text => {
                  setVariant({...variant, price: text});
                }}
              />

              <Button
                title="Add"
                buttonStyle={common.backgroundRed}
                containerStyle={[common.width100Per, common.marginTop(15)]}
                raised={true}
                onPress={() => {
                  props.setModalVarVisible(false);
                }}
              />
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
      </ScrollView>
    </Modal>
  );
};

export default ModalVariantCreate;
