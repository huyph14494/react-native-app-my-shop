import AsyncStorage from '@react-native-community/async-storage';

const getData = async key => {
  let result = null;
  if (key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null && value !== undefined) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.log(new Error('getData ' + error));
    }
  }

  return result;
};

const storeData = async (key, value) => {
  if (!key || !value) {
    return;
  }

  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(new Error('storeData ' + error));
  }
};

export {getData, storeData};
