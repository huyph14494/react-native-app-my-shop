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
  }

  fetchData = async whereFn => {
    try {
      let summaryData = await getData('@summary');
      let dataUpdate = {};
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
      } else {
        dataUpdate = {
          totalOrders: summaryData.totalOrders,
          totalProducts: summaryData.totalProducts,
        };
      }

      if (this._isMounted) {
        this.setState({
          isLoading: false,
          totalOrders: dataUpdate.totalOrders,
          totalProducts: dataUpdate.totalProducts,
        });
      }
    } catch (error) {
      console.log(whereFn, error);
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.navigation.addListener('focus', e => {
      if (this.state.isLoading) {
        this.fetchData('Home componentDidMount fetchData');
      } else {
        this.setState({isLoading: true}, () => {
          this.fetchData('Home componentDidMount fetchData');
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
