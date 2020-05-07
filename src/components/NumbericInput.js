import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import common from '../styles/common';
import Icon from 'react-native-vector-icons/FontAwesome';

const NumbericeInput = ({styleContainer, onAction}) => {
  const [item, setItem] = useState('1');

  useEffect(() => {
    onAction(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <View style={[common.container(1, 'row'), styleContainer]}>
      <TouchableOpacity
        style={[common.numbericLeft]}
        onPress={() => {
          if (Number(item) <= 1) {
            setItem(String(1));
          } else {
            setItem(String(Number(item) - 1));
          }
        }}>
        <Icon name="minus" size={24} color="white" />
      </TouchableOpacity>

      <TextInput
        style={[common.numbericCenter]}
        underlineColorAndroid="transparent"
        keyboardType="numeric"
        maxLength={3}
        onChangeText={text => {
          setItem(text);
        }}
        onSubmitEditing={event => {
          if (event.nativeEvent.text) {
            setItem(event.nativeEvent.text);
          }
        }}
        value={item}
      />

      <TouchableOpacity
        style={[common.numbericRight]}
        onPress={() => {
          if (Number(item) >= 999) {
          } else {
            setItem(String(Number(item) + 1));
          }
        }}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default NumbericeInput;
