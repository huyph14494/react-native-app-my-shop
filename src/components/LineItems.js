import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import common from '../styles/common.js';

function showItems(item, index) {
  return (
    <View
      key={index}
      style={[
        common.group(1, 'column'),
        common.margin(5, 0),
        common.borderBottom('rgba(0,0,0,.075)', 1),
      ]}>
      <View style={[common.group(1, 'row'), common.padding(5, 5)]}>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }),
          ]}>
          <View style={common.badgeIconView}>
            <Text style={common.badge}> {item.quantity} </Text>
            <Image
              style={common.tinyLogo}
              source={require('../assets/no-image.jpg')}
            />
          </View>
        </View>
        <View
          style={[
            common.container(3, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-start',
            }),
            common.padding(0, 5),
          ]}>
          <Text style={common.padding(2, 0)}>{item.title_product}</Text>
          <Text style={common.padding(2, 0)}>{item.title_variant}</Text>
          <Text style={common.padding(2, 0)}>{item.price}</Text>
        </View>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-end',
            }),
          ]}>
          <Text>{item.price * item.quantity}</Text>
        </View>
      </View>
    </View>
  );
}

const LineItems = props => {
  if (Array.isArray(props.items) && props.items.length) {
    return (
      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={props.items}
        renderItem={({item, index}) => showItems(item, index)}
        keyExtractor={item => item.id}
        extraData={props.items}
      />
    );
  } else {
    return <View />;
  }
};

export default LineItems;
