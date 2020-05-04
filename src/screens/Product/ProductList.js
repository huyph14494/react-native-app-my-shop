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
      fetching_from_server: false,
      isListEnd: false,
      products: [],
    };
    this.page = 1;
  }

  async componentDidMount() {
    try {
      let productData = await getData('@products');
      let dataUpdate = {};

      if (!productData) {
        productData = {data: [], expired: null};
      }

      if (
        productData &&
        (!productData.expired || new Date() > new Date(productData.expired))
      ) {
        await haravan.delayAPi(2000);
        let data = await haravan.callApi({
          entity: haravan.ENTITY_PRODUCT,
          action: haravan.GET_PRODUCTS,
          params: {
            fields: 'id,title,variants',
            page: this.page,
            limit: haravan.LIMIT_LIST,
          },
        });

        if (data && Array.isArray(data.products) && data.products.length > 0) {
          let now = new Date();
          productData = {
            data: data.products,
            expired: new Date(now.getTime() + haravan.TIME_CACHE_API),
          };
          await storeData('@products', productData);
        }

        if (productData.data.length < haravan.LIMIT_LIST) {
          dataUpdate.isListEnd = true;
        }
      }

      dataUpdate.products = productData.data;
      dataUpdate.isLoading = false;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState(dataUpdate);
    } catch (error) {
      console.log('ProductList componentDidMount:', error);
    }
  }

  loadMoreData = () => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({fetching_from_server: true}, async () => {
        try {
          await haravan.delayAPi(2000);
          let data = await haravan.callApi({
            entity: haravan.ENTITY_PRODUCT,
            action: haravan.GET_PRODUCTS,
            params: {
              fields: 'id,title,variants',
              page: this.page + 1,
              limit: haravan.LIMIT_LIST,
            },
          });

          if (
            data &&
            Array.isArray(data.products) &&
            data.products.length > 0
          ) {
            //Successful response from the API Call
            this.page = this.page + 1;
            //After the response increasing the offset for the next API call.

            let dataUpdate = {
              products: [...this.state.products, ...data.products],
              //adding the new data with old one available
              fetching_from_server: false,
              //updating the loading state to false
            };
            if (data.products.length < haravan.LIMIT_LIST) {
              dataUpdate.isListEnd = true;
            }
            this.setState(dataUpdate);
          } else {
            this.setState({
              fetching_from_server: false,
              isListEnd: true,
            });
          }
        } catch (error) {
          console.log('ProductList loadMoreData:', error);
        }
      });
    }
  };

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
          style={[
            common.container(1, 'column', {
              alignItems: 'center',
              backgroundColor: 'white',
            }),
          ]}>
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
              loadMoreData={this.loadMoreData}
              fetching_from_server={this.state.fetching_from_server}
            />
          </View>
        </View>
      );
    }
  }
}

export default ProductList;
