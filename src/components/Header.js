import React from 'react';
import {Header, Text} from 'react-native-elements';
import common from '../styles/common';

const HeaderComponent = props => {
  let leftComponent = props.leftComponent || <Text />;
  let rightComponent = props.rightComponent || <Text />;

  return (
    <Header
      centerComponent={{
        text: props.name,
        style: {color: '#fff', fontWeight: 'bold'},
      }}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
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
