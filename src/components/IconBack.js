import React from 'react';
import {TouchableOpacity} from 'react-native';
import common from '../styles/common.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconBack = ({navigation, screenNext, screenCurrent}) => {
  return (
    <TouchableOpacity
      style={[common.padding(8, 18)]}
      onPress={() =>
        navigation.navigate(screenNext, {
          screen: screenCurrent,
        })
      }>
      <Icon color="white" name="arrow-left" size={22} />
    </TouchableOpacity>
  );
};

export default IconBack;
