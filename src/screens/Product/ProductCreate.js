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

const leftComponent = navigation => {
  return (
    <View>
      <IconBack
        navigation={navigation}
        screenNext={'ProductHome'}
        screenCurrent={'ProductCreate'}
      />
    </View>
  );
};

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
      variantsNew = productData.variants.filter(
        variantObj => variantObj.id !== item.id,
      );
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

const compareProduct = (proGeneral, proVariant) => {
  let result = {};
  result.title = proGeneral.title;
  result.body_html = proGeneral.body_html;
  result.published = proGeneral.published;
  result.product_type = 'Default';

  let variantsNew = [];
  for (let i = 0; i < proVariant.variants.length; i++) {
    let item = {
      option1: proVariant.variants[i].title,
      title: proVariant.variants[i].title,
      price: proVariant.variants[i].price,
      sku: proVariant.variants[i].sku,
    };
    variantsNew.push(item);
  }
  result.variants = variantsNew;
  return result;
};

const ProductCreate = ({route, navigation}) => {
  const [isCreate, setIsCreate] = useState(false);

  const [proGeneral, setProGeneral] = useState({
    title: '',
    body_html: '',
    published: true,
  });

  const [proVariant, setProVariant] = useState({
    variants: [],
  });

  const onActionChangeVariant = useCallback(
    variants => {
      (() => {
        setProVariant({...proVariant, variants});
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const createProduct = () => {
    let messError = [];
    if (String(proGeneral.title).trim() === '') {
      messError.push('Title must not be blank!!!');
    }

    if (proVariant.variants && proVariant.variants.length) {
    } else {
      messError.push('You have to create variant!!!');
    }

    messError = messError.join(' \n');
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
    } else {
      setIsCreate(true);
    }
  };

  useEffect(() => {
    let createProductApi = async () => {
      try {
        let dataCreate = compareProduct(proGeneral, proVariant);
        dataCreate = {product: dataCreate};
        await haravan.delayAPi(1500);
        await haravan.callApi({
          entity: haravan.ENTITY_PRODUCT,
          action: haravan.CREATE_PRODUCT,
          data: dataCreate,
          whereFn: 'ProductCreate createProductApi',
        });
        await removeData('@products');
        await removeData('@summary');
      } catch (error) {
        console.log('ProductCreate createProductApi:', error);
      }

      navigation.navigate('ProductHome', {
        screen: 'ProductCreate',
        data: null,
      });
    };

    if (isCreate) {
      createProductApi();
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
          rightComponent={rightComponent(createProduct)}
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

export default ProductCreate;
