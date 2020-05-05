import React, {useState, useEffect} from 'react';
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
import IconBack from '../../components/IconBack.js';

const leftComponent = navigation => {
  return (
    <IconBack
      navigation={navigation}
      screenNext={'ProductList'}
      screenCurrent={'ProductDetail'}
    />
  );
};

const FormGeneral = ({productData, isAction, onAction}) => {
  const [title, setTitle] = useState(productData.title);
  const [description, setDescription] = useState(productData.body_html);
  const [published, setPublished] = useState(!!productData.published_at);

  useEffect(() => {
    if (isAction) {
      onAction({title, description, published});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAction]);

  return (
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
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <TextInput
        style={[common.textInputNoBorder, common.marginTop(15)]}
        multiline
        numberOfLines={4}
        underlineColorAndroid={'rgba(0,0,0,.075)'}
        placeholder={'Description'}
        value={description}
        onChangeText={text => {
          setDescription(text);
        }}
      />

      <CheckBox
        title="Publish"
        checked={published}
        containerStyle={common.checkBoxElementCustom}
        textStyle={common.fontWeight('normal')}
        onPress={() => setPublished(!published)}
      />
    </View>
  );
};

const ProductDetail = ({route, navigation}) => {
  const [modalVarVisible, setModalVarVisible] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const productData = route.params?.data?.product ?? null;

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

            <FormGeneral productData={productData} isAction={isAction} />
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
