import React from 'react';
import {View, Text} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.viewStyles}>
      <Text style={styles.textStyles}>Blitz Reading</Text>
    </View>
  );
};

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
