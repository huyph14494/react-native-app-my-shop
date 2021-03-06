import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import common from '../../styles/common.js';
import Header from '../../components/Header.js';
import {formatDate} from '../../helpers/moment.js';
import {haravan} from '../../apis/haravan/haravan.js';
import {getData, storeData} from '../../helpers/async_storage.js';
import SplashScreen from '../SplashScreen/SplashScreen.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      totalOrders: 0,
      totalProducts: 0,
    };
    this._isMounted = false;
    this._isFirstLoad = true;
  }

  fetchData = async (whereFn, _isGetData = true, summaryDataExist = null) => {
    try {
      let summaryData = null;

      if (_isGetData) {
        summaryData = await getData('@summary');
      } else {
        summaryData = summaryDataExist;
      }

      if (!summaryData) {
        summaryData = {
          totalOrders: 0,
          totalProducts: 0,
        };

        await haravan.delayAPi();
        let orders = await haravan.callApi({
          entity: haravan.ENTITY_ORDER,
          action: haravan.COUNT_ORDERS,
          whereFn,
        });

        if (orders && orders.count) {
          summaryData.totalOrders = orders.count;
        }

        await haravan.delayAPi();
        let products = await haravan.callApi({
          entity: haravan.ENTITY_PRODUCT,
          action: haravan.COUNT_PRODUCTS,
          whereFn,
        });

        if (products && products.count) {
          summaryData.totalProducts = products.count;
        }

        await storeData('@summary', summaryData);
      }

      if (this._isMounted) {
        this.setState({
          isLoading: false,
          totalOrders: summaryData.totalOrders,
          totalProducts: summaryData.totalProducts,
        });
        this._isFirstLoad = false;
      }
    } catch (error) {
      console.log(whereFn, error);
    }
  };

  componentDidMount() {
    this._isMounted = true;

    if (this._isFirstLoad) {
      this.fetchData('Home componentDidMount fetchData');
    }
    this._unsubscribe = this.props.navigation.addListener('focus', async e => {
      if (!this._isFirstLoad) {
        let summaryData = await getData('@summary');
        if (
          summaryData &&
          summaryData.totalOrders === this.state.totalOrders &&
          summaryData.totalProducts === this.state.totalProducts
        ) {
          // nothing
        } else {
          if (this.state.isLoading) {
            this.fetchData(
              'Home componentDidMount fetchData',
              false,
              summaryData,
            );
          } else {
            this.setState({isLoading: true}, () => {
              this.fetchData(
                'Home componentDidMount fetchData',
                false,
                summaryData,
              );
            });
          }
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._unsubscribe();
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    } else {
      return (
        <View style={common.container(1, 'column', {alignItems: 'center'})}>
          <Header name={this.props.route.name} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[common.groupWidth(1, 'column'), common.marginTop(15)]}>
              <View
                style={[
                  common.container(1, 'row', {
                    justifyContent: 'space-between',
                  }),
                  common.padding(15, 15),
                  common.borderBottom('rgba(0,0,0,.075)', 1),
                ]}>
                <Text style={common.textHeader}>General</Text>
                <Text style={common.textHeader}>{formatDate(new Date())}</Text>
              </View>

              {/* ------------------------------------------------------------------------------ */}
              <View style={[common.container(1, 'row'), common.padding(15)]}>
                <View
                  style={common.container(1, 'column', {alignItems: 'center'})}>
                  <Text style={common.marginBottom(15)}>Products</Text>
                  <Text>{this.state.totalProducts || 0}</Text>
                </View>
                <View
                  style={common.container(1, 'column', {alignItems: 'center'})}>
                  <Text style={common.marginBottom(15)}>Orders</Text>
                  <Text>{this.state.totalOrders || 0}</Text>
                </View>
                {/* <View
                  style={common.container(1, 'column', {alignItems: 'center'})}>
                  <Text style={common.marginBottom(15)}>Revenue</Text>
                  <Text>100$</Text>
                </View> */}
              </View>
            </View>
            {/* ------------------------------------------------------------------------------ */}
            <View style={[common.groupWidth(1, 'row'), common.marginTop(15)]}>
              <View
                style={[
                  common.container(1, 'column', {
                    justifyContent: 'center',
                  }),
                  common.padding(15, 15),
                ]}>
                <Button
                  title="+ Create Product"
                  type="outline"
                  containerStyle={common.btnOutlineContainer}
                  onPress={() => this.props.navigation.navigate('Product')}
                />
              </View>
              <View
                style={[
                  common.container(1, 'column', {
                    justifyContent: 'center',
                  }),
                  common.padding(15, 15),
                ]}>
                <Button
                  title="+ Create Order"
                  type="outline"
                  containerStyle={common.btnOutlineContainer}
                  onPress={() => this.props.navigation.navigate('Order')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

export default Home;
