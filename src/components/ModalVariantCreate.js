import React from 'react';
import {View, Text, Modal, Alert, ScrollView, TextInput} from 'react-native';
import common from '../styles/common';
import {Button} from 'react-native-elements';

const ModalVariantCreate = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVarVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
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
              <Text style={common.textHeader}>Variant</Text>
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
              />
              <TextInput
                style={[common.textInputNoBorder, common.marginTop(15)]}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Sku'}
              />
              <TextInput
                style={[common.textInputNoBorder, common.marginTop(15)]}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Price'}
              />

              <Button
                title="Add"
                buttonStyle={common.backgroundRed}
                containerStyle={[common.width100Per, common.marginTop(15)]}
                onPress={() => {
                  props.setModalVarVisible(false);
                }}
              />
              <Button
                title="Close"
                type="outline"
                containerStyle={[common.width100Per, common.marginTop(15)]}
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
