import {AppRegistry} from 'react-native';
import App from './src/screens/index.js';
import {name as appName} from './src/configs/app.json';

AppRegistry.registerComponent(appName, () => App);
