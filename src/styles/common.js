import {StyleSheet, Dimensions} from 'react-native';
const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;
const headerHeight = (heightWindow * 12) / 100;
const marginHeader = 50;
const textIputHeight = 40;

export default StyleSheet.create({
  headerStyle: {
    backgroundColor: 'red',
    height: headerHeight,
  },
  marginTopHeader: {
    marginTop: marginHeader,
  },
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
    let styles = {
      flex: flex,
      flexDirection: flexDirection,
      backgroundColor: 'white',
      width: widthWindow - separation * 2,
      borderRadius: 5,
    };

    return styles;
  },
  groupHeight(height = 1, flexDirection = 'column', separation = 10) {
    let styles = {
      height: height,
      flexDirection: flexDirection,
      backgroundColor: 'white',
      width: widthWindow - separation * 2,
      borderRadius: 5,
    };

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
  marginTop(marginTop) {
    let styles = {};

    if (marginTop) {
      styles.marginTop = marginTop;
    }

    return styles;
  },
  textInput: {
    height: textIputHeight,
    borderColor: 'rgba(0,0,0,.075)',
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
  searchBox: {
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    width: widthWindow - 15 * 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    top: headerHeight + 10,
    borderColor: 'rgba(0,0,0,.075)',
    borderWidth: 1,
    borderRadius: 5,

    /* ------------------- shadow --------------------- */
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
