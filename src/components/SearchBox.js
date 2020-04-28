import React from 'react';
import {View, TextInput} from 'react-native';
import common from '../styles/common';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBox = () => {
  return (
    <View style={common.searchBox}>
      <View style={[common.container(8, 'column'), common.padding(5, 5)]}>
        <TextInput style={common.textInput} />
      </View>
      <View
        style={[
          common.container(1, 'column', {
            justifyContent: 'center',
            alignItems: 'center',
          }),
          common.padding(5, 5),
        ]}>
        <Icon name="search" size={24} />
      </View>
    </View>
  );
};

export default SearchBox;
