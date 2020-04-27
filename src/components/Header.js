import React from 'react';
import {Header} from 'react-native-elements';
import common from '../styles/common';

const HeaderComponent = props => {
  return (
    <Header
      centerComponent={{
        text: props.name,
        style: {color: '#fff', fontWeight: 'bold'},
      }}
      statusBarProps={{
        barStyle: 'light-content',
        translucent: true,
        backgroundColor: 'transparent',
      }}
      containerStyle={common.headerStyle}
    />
  );
};

export default HeaderComponent;
