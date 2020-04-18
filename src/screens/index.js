import React from 'react';
import {View} from 'react-native';
import Home from './Home.js';
import common from '../styles/common.js';

const App = function() {
  return (
    <View
      style={common.container(1, 'column', {
        backgroundColor: 'rgba(0,0,0,.075)',
      })}>
      <Home title="HOME" />
    </View>
  );
};

export default App;
