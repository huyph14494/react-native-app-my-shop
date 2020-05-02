import React, {Component} from 'react';
import {View} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import ListProduct from '../../components/ListProduct.js';
import SearchBox from '../../components/SearchBox.js';
import SplashScreen from '../SplashScreen/SplashScreen';
import IconBack from '../../components/IconBack.js';
import {haravan} from '../../apis/haravan/haravan.js';
import {getData, storeData} from '../../helpers/async_storage.js';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      products: [],
    };
  }

  async componentDidMount() {
    try {
      let productData = await getData('@products');
      if (!productData) {
        productData = {data: [], expired: null};
      }

      if (
        productData &&
        (!productData.expired || new Date() > new Date(productData.expired))
      ) {
        let data = await haravan.callApi({
          entity: haravan.ENTITY_PRODUCT,
          action: haravan.GET_PRODUCTS,
          params: {fields: 'id,title,variants'},
        });

        if (data && data.products) {
          let now = new Date();
          productData = {
            data: data.products,
            expired: new Date(now.getTime() + 60000),
          };
          await storeData('@products', productData);
        }
      }
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({products: productData.data, isLoading: false});
    } catch (error) {
      console.log('ProductList componentDidMount:', error);
    }
  }

  navigationNextFn = product => {
    this.props.navigation.navigate('ProductDetail', {
      screen: 'ProductList',
      product,
    });
  };

  leftComponent = () => {
    return (
      <IconBack
        navigation={this.props.navigation}
        screenNext={'ProductHome'}
        screenCurrent={'ProductList'}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    } else {
      return (
        <View
          style={common.container(1, 'column', {
            alignItems: 'center',
            backgroundColor: 'white',
          })}>
          <Header
            name={this.props.route.name}
            leftComponent={this.leftComponent()}
          />

          {/* ------------------- Filter --------------------- */}
          <SearchBox />
          {/* ------------------- LIST PRODUCT --------------------- */}
          <View
            style={[
              common.groupWidthHeight('100%', 'row'),
              common.marginTop(15),
            ]}>
            <ListProduct
              products={this.state.products}
              navigationFn={this.navigationNextFn}
            />
          </View>
        </View>
      );
    }
  }
}

export default ProductList;
