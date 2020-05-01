import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import common from '../styles/common.js';

function showItems(item, index) {
  return (
    <View
      key={item.id}
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
            <Text style={common.badge}> 2 </Text>
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
          <Text style={common.padding(2, 0)}>{item.name}</Text>
          <Text style={common.padding(2, 0)}>Default value</Text>
          <Text style={common.padding(2, 0)}>100.000</Text>
        </View>
        <View
          style={[
            common.container(1, 'column', {
              justifyContent: 'center',
              alignItems: 'flex-end',
            }),
          ]}>
          <Text>500.000</Text>
        </View>
      </View>
    </View>
  );
}

const LineItems = props => {
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
};

export default LineItems;
