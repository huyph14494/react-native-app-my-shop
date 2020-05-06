import React, {useState, useCallback, useEffect, memo} from 'react';
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
import SplashScreen from '../SplashScreen/SplashScreen';
import {haravan} from '../../apis/haravan/haravan.js';
import {removeData} from '../../helpers/async_storage.js';
import {createUUID} from '../../helpers/moment.js';

// const leftComponent = navigation => {
//   return (
//     <View>
//       <IconBack
//         navigation={navigation}
//         screenNext={'ProductList'}
//         screenCurrent={'ProductDetail'}
//       />
//     </View>
//   );
// };

const leftComponent = onAction => {
  return (
    <View>
      <TouchableOpacity
        style={[common.padding(8, 18)]}
        onPress={() => {
          onAction();
        }}>
        <Icon color="white" name="check" size={22} />
      </TouchableOpacity>
    </View>
  );
};

let variantTmp = {};
const ContainerVariants = memo(({productData, onAction}) => {
  const [modalVarVisible, setModalVarVisible] = useState(false);
  const onActionVariant = (item, action) => {
    let variantsNew = [];
    if (action === 1) {
      item.id = createUUID();
      item._isNew = true;
      variantsNew = [...productData.variants, item];
    } else if (action === 2) {
      variantsNew = productData.variants.map(variantObj => {
        if (variantObj.id === item.id) {
          return item;
        } else {
          return variantObj;
        }
      });
    } else if (action === 3) {
      variantsNew = productData.variants.filter(
        variantObj => variantObj.id !== item.id,
      );
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

const compareProduct = (productOld, productNew) => {
  let result = {};
  let isUpdate = false;

  if (productOld.title !== productNew.title) {
    isUpdate = true;
    result.title = productNew.title;
  }

  if (productOld.body_html !== productNew.body_html) {
    isUpdate = true;
    result.body_html = productNew.body_html;
  }

  if (productOld.published !== productNew.published) {
    isUpdate = true;
    result.published = productNew.published;
  }

  let isUpdateVar = false;
  if (productOld.variants.length === productNew.variants.length) {
    for (let i = 0; i < productOld.variants.length; i++) {
      if (
        productOld.variants[i].id !== productNew.variants[i].id ||
        productOld.variants[i].title !== productNew.variants[i].title ||
        productOld.variants[i].sku !== productNew.variants[i].sku ||
        productOld.variants[i].price !== productNew.variants[i].price
      ) {
        isUpdateVar = true;
        break;
      }
    }
  } else {
    isUpdateVar = true;
  }

  if (isUpdateVar) {
    let variantsNew = [];
    for (let i = 0; i < productOld.variants.length; i++) {
      let item = {
        option1: productOld.variants[i].title,
        title: productOld.variants[i].title,
        price: productOld.variants[i].price,
        sku: productOld.variants[i].sku,
      };
      if (productOld.variants[i].id && !productOld.variants[i]._isNew) {
        item.id = productOld.variants[i].id;
      }
      variantsNew.push(item);
    }
    result.variants = variantsNew;
    isUpdate = true;
  }

  return isUpdate ? result : null;
};

const ProductDetail = ({route, navigation}) => {
  const [isCreate, setIsCreate] = useState(false);

  const productData = route.params?.data?.product ?? null;
  if (productData) {
    productData.published = !!productData.published_at;
  }
  const [productState, setProductState] = useState(
    productData ? {...productData} : {},
  );

  const onActionChangeVariant = useCallback(
    variants => {
      (() => {
        productData.variants = variants;
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const updateProduct = () => {
    setIsCreate(true);
  };

  useEffect(() => {
    let updateProductApi = async () => {
      try {
        let dataUpdate = compareProduct(productData, productState);
        if (dataUpdate) {
          dataUpdate.id = productData.id;
          dataUpdate = {product: dataUpdate};

          await haravan.delayAPi();
          await haravan.callApi({
            entity: haravan.ENTITY_PRODUCT,
            action: haravan.UPDATE_PRODUCT,
            id: productData.id,
            data: dataUpdate,
            whereFn: 'ProductDetail updateProductApi',
          });
          await removeData('@products');
        }
      } catch (error) {
        console.log('ProductDetail updateProductApi:', error);
      }

      navigation.navigate('ProductHome', {
        screen: 'ProductList',
        data: null,
      });
    };

    if (isCreate) {
      updateProductApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreate]);

  if (isCreate) {
    return <SplashScreen />;
  } else {
    return (
      <View>
        <Header
          name={route.name}
          leftComponent={leftComponent(updateProduct)}
        />

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
  }
};

export default ProductDetail;
