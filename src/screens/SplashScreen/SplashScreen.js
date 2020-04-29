import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.viewStyles}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
};

export default SplashScreen;
