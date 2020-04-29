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
import {CheckBox} from 'react-native-elements';
import ModalVariantCreate from '../../components/ModalVariantCreate.js';

function leftComponent(navigation) {
  return (
    <TouchableOpacity
      style={common.padding(0, 5)}
      onPress={() =>
        navigation.navigate('ProductList', {
          screen: 'ProductDetail',
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

const ProductDetail = ({route, navigation}) => {
  const [modalVarVisible, setModalVarVisible] = useState(false);

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
              <Text style={common.textHeader}>General</Text>
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
                value={route.params.product.name}
              />
              <TextInput
                style={[common.textInputNoBorder, common.marginTop(15)]}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Description'}
                value={route.params.product.name}
              />
              <TextInput
                style={[common.textInputNoBorder, common.marginTop(15)]}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Price'}
              />

              <CheckBox
                title="Publish"
                checked={true}
                containerStyle={common.checkBoxElementCustom}
                textStyle={common.fontWeight('normal')}
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
              <Text style={common.textHeader}>Variants</Text>
            </View>
            <TouchableOpacity
              style={[
                common.container(1, 'row', {
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }),
                common.padding(15, 15),
              ]}
              onPress={() => {
                setModalVarVisible(true);
              }}>
              <View
                style={[
                  common.container(1, 'column', {
                    justifyContent: 'center',
                    alignItems: 'center',
                  }),
                  common.padding(0, 10),
                ]}>
                <Icon color="red" name="plus-circle" size={20} />
              </View>
              <View
                style={[
                  common.container(12, 'column', {
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }),
                ]}>
                <Text>Add Variant</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* ------------------------------------------------------ */}
          <ModalVariantCreate
            setModalVarVisible={setModalVarVisible}
            modalVarVisible={modalVarVisible}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;
