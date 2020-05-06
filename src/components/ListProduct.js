import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import common from '../styles/common.js';
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
      }}
      key={String(item.id)}>
      <View
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
            <Image
              style={common.tinyLogo}
              source={require('../assets/no-image.jpg')}
            />
          </View>
          <View
            style={[
              common.container(3, 'column', {
                justifyContent: 'center',
                alignItems: 'flex-start',
              }),
            ]}>
            <Text style={common.textBold}>{item.title}</Text>
            <Text>{item.variants?.length ?? 0} varaints</Text>
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

const ListProduct = props => {
  console.log('ListProduct');
  return (
    <FlatList
      style={common.marginBottomHeaderSearch}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      data={props.products}
      renderItem={({item, index}) => showItems(item, index, props.navigationFn)}
      keyExtractor={item => String(item.id)}
      extraData={props.products}
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

export default ListProduct;
