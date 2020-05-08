import React from 'react';
import common from '../styles/common.js';
import {formatDateTime} from '../helpers/moment';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {haravan} from '../apis/haravan/haravan.js';

function showItems(item, index, navigationFn) {
  let styleFirstItem = {};
  if (index === 0) {
    styleFirstItem = common.marginTopHeader;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigationFn(item);
      }}>
      <View
        key={item.id}
        style={[
          common.group(1, 'column'),
          common.margin(5, 15),
          common.borderBottom('rgba(0,0,0,.075)', 1),
          styleFirstItem,
        ]}>
        <View style={[common.group(1, 'row'), common.padding(5, 5)]}>
          <View
            style={[
              common.container(1, 'column', {
                justifyContent: 'center',
                alignItems: 'flex-start',
              }),
            ]}>
            <Text style={common.textHeader}>{item.order_number}</Text>
          </View>
          <View
            style={[
              common.container(1, 'column', {
                justifyContent: 'center',
                alignItems: 'flex-end',
              }),
            ]}>
            {item.financial_status === 'paid' ? (
              <Text style={common.labelSuccess}>{item.financial_status}</Text>
            ) : (
              <Text style={common.labelDanger}>{item.financial_status}</Text>
            )}
          </View>
          <View
            style={[
              common.container(1, 'column', {
                justifyContent: 'center',
                alignItems: 'flex-end',
              }),
            ]}>
            {item.fulfillment_status === 'fulfilled' ? (
              <Text style={common.labelSuccess}>{item.fulfillment_status}</Text>
            ) : (
              <Text style={common.labelWarning}>{item.fulfillment_status}</Text>
            )}
          </View>
        </View>
        <View
          style={[
            common.group(1, 'row'),
            common.padding(5, 5),
            common.marginBottom(10),
          ]}>
          <View
            style={[
              common.container(1, 'column', {
                justifyContent: 'center',
                alignItems: 'flex-start',
              }),
            ]}>
            <Text>{formatDateTime(item.created_at)}</Text>
          </View>
          <View
            style={[
              common.container(1, 'column', {
                justifyContent: 'center',
                alignItems: 'flex-end',
              }),
            ]}>
            <Text style={common.textHeader}>{item.total_price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const renderFooter = props => {
  return (
    <View style={common.footerList}>
      {props.isFetchingLoadMore ? (
        <ActivityIndicator
          color="red"
          size="large"
          style={common.margin(15, 15)}
        />
      ) : null}
    </View>
  );
};

const ListOrder = props => {
  return (
    <FlatList
      style={common.marginBottomHeaderSearch}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={props.orders}
      renderItem={({item, index}) => showItems(item, index, props.navigationFn)}
      keyExtractor={item => String(item.id)}
      extraData={props.orders}
      onEndReached={() => {
        if (!props.isFetchingLoadMore) {
          props.loadMoreData();
        }
      }}
      onEndReachedThreshold={0.2}
      ListFooterComponent={renderFooter(props)}
      initialNumToRender={haravan.LIMIT_LIST} // how many item to display first
      refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={props.isLoading}
          onRefresh={props.onRefresh}
        />
      }
    />
  );
};

export default ListOrder;
