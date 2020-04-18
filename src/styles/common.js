import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container(flex = 1, flexDirection = 'column', options) {
    let styles = {
      flex: flex,
      flexDirection: flexDirection,
    };

    if (options && typeof options === 'object') {
      styles = {...styles, ...options};
    }

    return styles;
  },
  group(flex = 1, flexDirection = 'column', separation = 10) {
    return {
      flex: flex,
      flexDirection: flexDirection,
      backgroundColor: 'white',
      width: Dimensions.get('window').width - separation * 2,
      marginTop: separation,
      borderRadius: 5,
    };
  },
  padding(paddingVertical, paddingHorizontal) {
    let styles = {};

    if (paddingVertical) {
      styles.paddingVertical = paddingVertical;
    }

    if (paddingHorizontal) {
      styles.paddingHorizontal = paddingHorizontal;
    }
    return styles;
  },
});
