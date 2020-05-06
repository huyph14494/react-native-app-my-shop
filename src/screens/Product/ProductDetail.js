import React, {useState, useCallback, memo} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from 'react-native-elements';
import ModalVariant from '../../components/ModalVariant.js';
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

let variantTmp = {};
const ContainerVariants = memo(({productData, onAction}) => {
  const [modalVarVisible, setModalVarVisible] = useState(false);
  const onActionVariant = (item, action) => {
    let variantsNew = [];
    if (action === 1) {
      variantsNew = [...productData.variants, item];
    } else {
      variantsNew = productData.variants.map(variantObj => {
        if (variantObj.id === item.id) {
          return item;
        } else {
          return variantObj;
        }
      });
    }
    onAction(variantsNew);
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
        <Text style={common.textHeader}>Variants</Text>
      </View>

      {/* ------------------------------------------------------ */}
      <TouchableOpacity
        style={[
          common.container(1, 'row', {
            justifyContent: 'center',
            alignItems: 'flex-start',
          }),
          common.padding(15, 15),
          common.borderBottom('rgba(0,0,0,.075)', 1),
        ]}
        onPress={() => {
          variantTmp = {};
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

      {/* ------------------------------------------------------ */}
      <ContainerListVariant
        variants={productData.variants}
        setModalVarVisible={setModalVarVisible}
      />
      {/* ------------------------------------------------------ */}
      <ModalVariant
        setModalVarVisible={setModalVarVisible}
        modalVarVisible={modalVarVisible}
        item={variantTmp}
        onAction={onActionVariant}
      />
    </View>
  );
});

const ContainerListVariant = memo(({variants, setModalVarVisible}) => {
  if (Array.isArray(variants) && variants.length) {
    return variants.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[
          common.container(1, 'row', {
            justifyContent: 'center',
            alignItems: 'center',
          }),
          common.padding(15, 15),
          common.borderBottom('rgba(0,0,0,.075)', 1),
        ]}
        onPress={() => {
          variantTmp = item;
          setModalVarVisible(true);
        }}>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-start',
            }),
          ]}>
          <Image
            style={common.tinyLogo}
            source={require('../../assets/no-image.jpg')}
          />
        </View>
        <View
          style={[
            common.container(3, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-start',
            }),
          ]}>
          <Text>Title: {item.title}</Text>
          <Text>Sku: {item.sku}</Text>
        </View>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-end',
            }),
          ]}>
          <Text>{item.price}</Text>
        </View>
      </TouchableOpacity>
    ));
  } else {
    return '';
  }
});

const ProductDetail = ({route, navigation}) => {
  const productData = route.params?.data?.product ?? null;
  if (productData) {
    productData.published = !!productData.published_at;
  }
  const [productState, setProductState] = useState(productData || {});

  const onActionChangeVariant = useCallback(
    variants => {
      (() => {
        productData.variants = variants;
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <View>
      <Header name={route.name} leftComponent={leftComponent(navigation)} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={common.marginBottomHeader}>
        <View
          style={[
            common.container(1, 'column', {
              alignItems: 'center',
              marginBottom: 30,
            }),
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
                value={productState.title}
                onChangeText={text => {
                  setProductState({...productState, title: text});
                }}
              />
              <TextInput
                style={[common.textInputNoBorder, common.marginTop(15)]}
                multiline
                numberOfLines={4}
                underlineColorAndroid={'rgba(0,0,0,.075)'}
                placeholder={'Description'}
                value={productState.body_html}
                onChangeText={text => {
                  setProductState({...productState, body_html: text});
                }}
              />

              <CheckBox
                title="Publish"
                checked={productState.published}
                containerStyle={common.checkBoxElementCustom}
                textStyle={common.fontWeight('normal')}
                onPress={() => {
                  setProductState({
                    ...productState,
                    published: !productState.published,
                  });
                }}
              />
            </View>
          </View>

          {/* ------------------------------------------------------ */}
          <ContainerVariants
            productData={productData}
            onAction={onActionChangeVariant}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;
