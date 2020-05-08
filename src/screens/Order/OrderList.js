import React, {Component} from 'react';
import {View} from 'react-native';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import ListOrder from '../../components/ListOrder.js';
import SearchBox from '../../components/SearchBox.js';
import SplashScreen from '../SplashScreen/SplashScreen';
import IconBack from '../../components/IconBack.js';
import {haravan} from '../../apis/haravan/haravan.js';
import {getData, storeData} from '../../helpers/async_storage.js';
const fields =
  'id,order_number,financial_status,fulfillment_status,created_at,customer,total_price';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFetchingLoadMore: false,
      isListEnd: false,
      orders: [],
      textSearch: '',
    };
    this.page = 1;
    this._isMounted = false;
  }

  fetchData = async (whereFn, isForceApi = false, isCacheData = true) => {
    try {
      let orderData = await getData('@orders');
      let dataUpdate = {};

      if (!orderData) {
        orderData = {data: [], expired: null};
      }

      if (
        orderData &&
        (isForceApi ||
          !orderData.expired ||
          new Date() > new Date(orderData.expired))
      ) {
        await haravan.delayAPi();
        let data = await haravan.callApi({
          entity: haravan.ENTITY_ORDER,
          action: haravan.GET_ORDERS,
          params: {
            fields,
            page: this.page,
            limit: haravan.LIMIT_LIST,
            query: this.state.textSearch,
          },
          whereFn,
        });

        if (data && Array.isArray(data.orders) && data.orders.length > 0) {
          let now = new Date();
          orderData = {
            data: data.orders,
            expired: new Date(now.getTime() + haravan.TIME_CACHE_API),
          };
          if (isCacheData && String(this.state.textSearch).trim() === '') {
            await storeData('@orders', orderData);
          }
        }

        if (orderData.data.length < haravan.LIMIT_LIST) {
          dataUpdate.isListEnd = true;
        }
      }

      dataUpdate.orders = orderData.data;
      dataUpdate.isLoading = false;
      if (this._isMounted) {
        this.setState(dataUpdate);
      }
    } catch (error) {
      console.log(whereFn, error);
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchData('OrderList componentDidMount fetchData');
  }

  loadMoreData = () => {
    if (
      !this.state.isFetchingLoadMore &&
      !this.state.isLoading &&
      !this.state.isListEnd
    ) {
      //On click of Load More button We will call the web API again
      this.setState({isFetchingLoadMore: true}, async () => {
        try {
          await haravan.delayAPi();
          let data = await haravan.callApi({
            entity: haravan.ENTITY_ORDER,
            action: haravan.GET_ORDERS,
            params: {
              fields,
              page: this.page + 1,
              limit: haravan.LIMIT_LIST,
              query: this.state.textSearch,
            },
            whereFn: 'OrderList loadMoreData',
          });

          if (data && Array.isArray(data.orders) && data.orders.length > 0) {
            //Successful response from the API Call
            this.page = this.page + 1;
            //After the response increasing the offset for the next API call.

            let dataUpdate = {
              orders: [...this.state.orders, ...data.orders],
              //adding the new data with old one available
              isFetchingLoadMore: false,
              //updating the loading state to false
            };
            if (data.orders.length < haravan.LIMIT_LIST) {
              dataUpdate.isListEnd = true;
            }

            if (this._isMounted) {
              this.setState(dataUpdate);
            }
          } else {
            if (this._isMounted) {
              this.setState({
                isFetchingLoadMore: false,
                isListEnd: true,
              });
            }
          }
        } catch (error) {
          console.log('OrderList loadMoreData:', error);
        }
      });
    }
  };

  onRefresh = () => {
    //Clear old data of the list
    this.setState({
      orders: [],
      isLoading: true,
      isFetchingLoadMore: false,
      isListEnd: false,
    });
    this.page = 1;

    //Call the Service to get the latest data
    this.fetchData('OrderList onRefresh fetchData', true);
  };

  onSearch = (textSearch, isClear) => {
    if (!this.state.isFetchingLoadMore && !this.state.isLoading) {
      this.setState(
        {textSearch, isListEnd: false, isLoading: true},
        async () => {
          this.page = 1;
          this.fetchData(
            'OrderList onSearch fetchData',
            isClear ? false : true,
            false,
          );
        },
      );
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  navigationNextFn = order => {
    this.props.navigation.navigate('OrderDetail', {
      screen: 'OrderList',
      data: {order},
    });
  };

  leftComponent = () => {
    return (
      <IconBack
        navigation={this.props.navigation}
        screenNext={'OrderHome'}
        screenCurrent={'OrderList'}
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
          <SearchBox
            onSearch={this.onSearch}
            textSearch={this.state.textSearch}
          />

          {/* ------------------- LIST ORDER --------------------- */}
          <View
            style={[
              common.groupWidthHeight('100%', 'row'),
              common.marginTop(15),
            ]}>
            <ListOrder
              orders={this.state.orders}
              isLoading={this.state.isLoading}
              navigationFn={this.navigationNextFn}
              loadMoreData={this.loadMoreData}
              isFetchingLoadMore={this.state.isFetchingLoadMore}
              onRefresh={this.onRefresh}
            />
          </View>
        </View>
      );
    }
  }
}

export default OrderList;
