import {AppRegistry} from 'react-native';
import App from './src/screens/index.js';
import {name as appName} from './src/configs/app.json';
import {enableScreens} from 'react-native-screens';
import {YellowBox} from 'react-native';

enableScreens();

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

AppRegistry.registerComponent(appName, () => App);
