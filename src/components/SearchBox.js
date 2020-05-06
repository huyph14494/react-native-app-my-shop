import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import common from '../styles/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

const actionSearch = _.debounce((text, onSearch) => {
  onSearch(text, String(text).trim() === '');
}, 3000);

const SearchBox = ({onSearch, textSearch}) => {
  const [textValue, setTextValue] = useState(textSearch);

  return (
    <View style={common.searchBox}>
      <View style={[common.container(8, 'row'), common.padding(5, 5)]}>
        <View style={[common.container(1, 'row'), common.textInput]}>
          <Icon
            name="search"
            size={24}
            style={[common.margin(5, 5), common.padding(0, 5)]}
          />

          <TextInput
            style={common.flex(1)}
            underlineColorAndroid="transparent"
            onChangeText={text => {
              setTextValue(text);
              actionSearch(text, onSearch);
            }}
            onSubmitEditing={event => {
              if (event.nativeEvent.text) {
                actionSearch.cancel();
                onSearch(event.nativeEvent.text);
              }
            }}
            value={textValue}
            placeholder={'Search'}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[
          common.container(1, 'column', {
            justifyContent: 'center',
            alignItems: 'center',
          }),
          common.padding(5, 5),
        ]}
        onPress={() => {
          if (
            textValue &&
            (String(textValue).trim() !== '' || textValue.length > 0)
          ) {
            actionSearch.cancel();
            setTextValue('');
            onSearch('', true);
          }
        }}>
        <Icon name="times-circle" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
