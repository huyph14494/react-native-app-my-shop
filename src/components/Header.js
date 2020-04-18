import React from 'react';
import {Header} from 'react-native-elements';

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
      containerStyle={{backgroundColor: 'red'}}
    />
  );
};

export default HeaderComponent;
