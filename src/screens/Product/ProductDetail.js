import React, {useState, useCallback, useEffect, memo} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
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

const rightComponent = onAction => {
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

const leftComponent = navigation => {
  return (
    <View>
      <IconBack
        navigation={navigation}
        screenNext={'ProductList'}
        screenCurrent={'ProductDetail'}
      />
    </View>
  );
};

let variantTmp = {};
const ContainerVariants = memo(({productData, onAction}) => {
  const [modalVarVisible, setModalVarVisible] = useState(false);
  const onActionVariant = (item, action) => {
    let variantsNew = [];
    let _isUpdate = true;
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
      if (productData.variants.length === 1) {
        Alert.alert(
          //title
          'Warning',
          //body
          'You should not delete the final variant!!!',
          [{text: 'Yes'}],
          {cancelable: true},
          //clicking out side of alert will not cancel
        );
        _isUpdate = false;
      } else {
        variantsNew = productData.variants.filter(
          variantObj => variantObj.id !== item.id,
        );
      }
    }
    if (_isUpdate) {
      onAction(variantsNew);
    }
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
    return <View />;
  }
});

const compareProduct = (productOld, proGeneral, proVariant) => {
  let result = {};
  let isUpdate = false;

  if (productOld.title !== proGeneral.title) {
    isUpdate = true;
    result.title = proGeneral.title;
  }

  if (productOld.body_html !== proGeneral.body_html) {
    isUpdate = true;
    result.body_html = proGeneral.body_html;
  }

  if (productOld.published !== proGeneral.published) {
    isUpdate = true;
    result.published = proGeneral.published;
  }

  let isUpdateVar = false;
  if (productOld.variants.length === proVariant.variants.length) {
    for (let i = 0; i < productOld.variants.length; i++) {
      if (
        productOld.variants[i].id !== proVariant.variants[i].id ||
        productOld.variants[i].title !== proVariant.variants[i].title ||
        productOld.variants[i].sku !== proVariant.variants[i].sku ||
        productOld.variants[i].price !== proVariant.variants[i].price
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
    for (let i = 0; i < proVariant.variants.length; i++) {
      let item = {
        option1: proVariant.variants[i].title,
        title: proVariant.variants[i].title,
        price: proVariant.variants[i].price,
        sku: proVariant.variants[i].sku,
      };
      if (proVariant.variants[i].id && !proVariant.variants[i]._isNew) {
        item.id = proVariant.variants[i].id;
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
  const [proGeneral, setProGeneral] = useState(
    productData
      ? {
          id: productData.id,
          title: productData.title,
          body_html: productData.body_html,
          published: productData.published,
        }
      : {},
  );

  const [proVariant, setProVariant] = useState(
    productData
      ? {
          id: productData.id,
          variants: productData.variants,
        }
      : {},
  );

  const onActionChangeVariant = useCallback(
    variants => {
      (() => {
        setProVariant({...proVariant, variants});
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const updateProduct = () => {
    if (String(proGeneral.title).trim() === '') {
      Alert.alert(
        //title
        'Warning',
        //body
        'Title Product must not be blank!!!',
        [{text: 'Yes'}],
        {cancelable: true},
        //clicking out side of alert will not cancel
      );
    } else {
      setIsCreate(true);
    }
  };

  useEffect(() => {
    let updateProductApi = async () => {
      try {
        let dataUpdate = compareProduct(productData, proGeneral, proVariant);
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
        screen: 'ProductDetail',
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
          leftComponent={leftComponent(navigation)}
          rightComponent={rightComponent(updateProduct)}
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
                <Text>Title:</Text>
                <TextInput
                  style={common.textInputNoBorder}
                  underlineColorAndroid={'rgba(0,0,0,.075)'}
                  value={proGeneral.title}
                  onChangeText={text => {
                    setProGeneral({...proGeneral, title: text});
                  }}
                />
                <Text style={[common.marginTop(10)]}>Description:</Text>
                <TextInput
                  style={[common.textInputNoBorder]}
                  multiline
                  numberOfLines={4}
                  underlineColorAndroid={'rgba(0,0,0,.075)'}
                  value={proGeneral.body_html}
                  onChangeText={text => {
                    setProGeneral({...proGeneral, body_html: text});
                  }}
                />

                <CheckBox
                  title="Publish"
                  checked={proGeneral.published}
                  containerStyle={common.checkBoxElementCustom}
                  textStyle={common.fontWeight('normal')}
                  onPress={() => {
                    setProGeneral({
                      ...proGeneral,
                      published: !proGeneral.published,
                    });
                  }}
                />
              </View>
            </View>

            {/* ------------------------------------------------------ */}
            <ContainerVariants
              productData={proVariant}
              onAction={onActionChangeVariant}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default ProductDetail;
