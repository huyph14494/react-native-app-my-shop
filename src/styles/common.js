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
  marginBottom(marginBottom) {
    let styles = {};

    if (marginBottom) {
      styles.marginBottom = marginBottom;
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
  labelSuccess: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#e5f2ce',
    color: '#4b6319',
    borderWidth: 1,
    borderColor: '#cddeb5',
  },
  labelDanger: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#f4b28f',
    color: '#815621',
    borderWidth: 1,
    borderColor: '#e6b77f',
  },
  labelWarning: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#fcf5d9',
    color: '#9b731d',
    borderWidth: 1,
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
    margin: 20,
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
});
