import {StyleSheet, Dimensions} from 'react-native';
const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;
const headerHeight = (heightWindow * 12) / 100;
const marginHeader = 67;
const textIputHeight = 40;

export default StyleSheet.create({
  headerStyle: {
    backgroundColor: 'red',
    height: headerHeight,
  },
  marginTopHeader: {
    marginTop: marginHeader,
  },
  marginBottomHeader: {
    marginBottom: marginHeader + 18,
  },
  marginBottomHeaderSearch: {
    marginBottom: marginHeader + textIputHeight,
  },
  widthFull: {
    width: '100%',
  },
  width100Per: {
    width: '100%',
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
  groupWidth(flex = 1, flexDirection = 'column', backgroundColor = 'white') {
    let styles = {
      flex: flex,
      flexDirection: flexDirection,
      backgroundColor: backgroundColor,
      width: widthWindow,
      borderRadius: 5,
    };

    return styles;
  },
  group(flex = 1, flexDirection = 'column', backgroundColor = 'white') {
    let styles = {
      flex: flex,
      flexDirection: flexDirection,
      backgroundColor: backgroundColor,
      borderRadius: 5,
    };

    return styles;
  },
  groupWidthHeight(
    height = 1,
    flexDirection = 'column',
    backgroundColor = 'white',
  ) {
    let styles = {
      height: height,
      flexDirection: flexDirection,
      backgroundColor: backgroundColor,
      width: widthWindow,
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
  paddingTop(paddingTop) {
    let styles = {};

    if (paddingTop) {
      styles.paddingTop = paddingTop;
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
  marginLeft(marginLeft) {
    let styles = {};

    if (marginLeft) {
      styles.marginLeft = marginLeft;
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
  marginBottom(marginBottom) {
    let styles = {};

    if (marginBottom) {
      styles.marginBottom = marginBottom;
    }

    return styles;
  },
  flex(flex) {
    let styles = {};

    if (flex) {
      styles.flex = flex;
    }

    return styles;
  },
  height(height) {
    let styles = {};

    if (height) {
      styles.height = height;
    }

    return styles;
  },
  textInput: {
    height: textIputHeight,
    borderColor: 'rgba(0,0,0,.075)',
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputNoBorder: {
    height: textIputHeight,
    width: '100%',
  },
  borderTop(borderTopColor = 'rgba(0,0,0,.075)', borderTopWidth = 1) {
    let styles = {
      borderTopColor: 'rgba(0,0,0,.075)',
      borderTopWidth: 1,
    };

    if (borderTopColor) {
      styles.borderTopColor = borderTopColor;
    }

    if (borderTopWidth) {
      styles.borderTopWidth = borderTopWidth;
    }
    return styles;
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
    top: headerHeight + 15,
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
  labelSuccessCheckBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 0,
    borderRadius: 5,
    backgroundColor: '#e5f2ce',
    borderWidth: 1.5,
    borderColor: '#cddeb5',
  },
  colorLabelSuccess: {
    color: '#4b6319',
  },
  labelSuccess: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#e5f2ce',
    color: '#4b6319',
    borderWidth: 1.5,
    borderColor: '#cddeb5',
  },
  labelDanger: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f4b28f',
    color: '#815621',
    borderWidth: 1.5,
    borderColor: '#e6b77f',
  },
  labelWarning: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fcf5d9',
    color: '#9b731d',
    borderWidth: 1.5,
    borderColor: '#e2dcc2',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textBold: {
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.075)',
  },
  btnOutlineContainer: {
    borderWidth: 1.5,
    borderColor: '#007bff',
  },
  marginTopLogin: {
    marginTop: -(heightWindow * 0.15),
  },
  viewLogoLogin: {
    borderColor: '#999',
    borderWidth: 0.5,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  logoLogin: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.075)',
  },
  textLogin: {
    fontWeight: 'bold',
    fontSize: 30,
    fontStyle: 'italic',
    color: 'white',
    padding: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  btnLoginLinear: {
    height: 48,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnLoginGroup: {
    margin: 1,
    width: 220,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  brnLoginText: {
    textAlign: 'center',
    color: 'white',
    padding: 15,
    marginLeft: 1,
    marginRight: 1,
    width: 220,
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkBoxElementCustom: {
    backgroundColor: 'white',
    borderWidth: 0,
    paddingLeft: 0,
  },
  fontWeight(fontWeight = 'bold') {
    return {
      fontWeight,
    };
  },
  modalView: {
    marginTop: marginHeader,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backgroundRed: {
    backgroundColor: 'red',
  },
  fontSize(fontSize) {
    return {
      fontSize,
    };
  },
  badgeIconView: {
    position: 'relative',
    padding: 5,
  },
  badge(value = 1) {
    let option = {
      measure: 18,
      paddingLeft: 3,
      paddingTop: 1,
      top: -1,
      right: 0,
    };

    if (value < 10) {
      option = {
        measure: 18,
        paddingLeft: 2.9,
        paddingTop: 1,
        top: -1,
        right: 0,
      };
    } else if (value < 100) {
      option = {
        measure: 20,
        paddingLeft: 1.1,
        paddingTop: 2,
        top: -1,
        right: -1,
      };
    } else {
      option = {
        measure: 24,
        paddingLeft: 0,
        paddingTop: 4,
        top: -1,
        right: -3,
      };
    }

    let style = {
      color: '#fff',
      fontSize: 11,
      position: 'absolute',
      zIndex: 10,
      top: option.top,
      right: option.right,
      backgroundColor: 'red',
      paddingLeft: option.paddingLeft,
      paddingTop: option.paddingTop,
      // borderRadius: 5,
      width: option.measure,
      height: option.measure,
      borderRadius: option.measure / 2,
    };
    return style;
  },
  footerList: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: {
    height: textIputHeight + 8,
    width: '100%',
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderColor: '#a0aec0',
    borderBottomWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  numbericLeft: {
    height: textIputHeight + 8,
    borderColor: 'rgba(0,0,0,.075)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    backgroundColor: '#FF0000',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  numbericCenter: {
    height: textIputHeight + 8,
    borderColor: 'rgba(0,0,0,.075)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: '20%',
    paddingLeft: 10,
  },
  numbericRight: {
    height: textIputHeight + 8,
    borderColor: 'rgba(0,0,0,.075)',
    borderWidth: 1,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#32CD32',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
});
