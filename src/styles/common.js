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
  group(
    flex = 1,
    flexDirection = 'column',
    separation = 10,
    isMarginTop = true,
  ) {
    let styles = {
      flex: flex,
      flexDirection: flexDirection,
      backgroundColor: 'white',
      width: Dimensions.get('window').width - separation * 2,
      borderRadius: 5,
    };

    if (isMarginTop) {
      styles.marginTop = separation;
    }

    return styles;
  },
  groupHeight(
    height = 1,
    flexDirection = 'column',
    separation = 10,
    isMarginTop = true,
  ) {
    let styles = {
      height: height,
      flexDirection: flexDirection,
      backgroundColor: 'white',
      width: Dimensions.get('window').width - separation * 2,
      borderRadius: 5,
    };

    if (isMarginTop) {
      styles.marginTop = separation;
    }

    return styles;
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
  margin(marginVertical, marginHorizontal) {
    let styles = {};

    if (marginVertical) {
      styles.marginVertical = marginVertical;
    }

    if (marginHorizontal) {
      styles.marginHorizontal = marginHorizontal;
    }
    return styles;
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  borderBottom(borderBottomColor = 'rgba(0,0,0,.075)', borderBottomWidth = 1) {
    let styles = {
      borderBottomColor: 'rgba(0,0,0,.075)',
      borderBottomWidth: 1,
    };

    if (borderBottomColor) {
      styles.borderBottomColor = borderBottomColor;
    }

    if (borderBottomWidth) {
      styles.borderBottomWidth = borderBottomWidth;
    }
    return styles;
  },
});
