/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// globalStyles.js
import {setGlobalStyles} from 'react-native-floating-label-input';
import {LogBox} from 'react-native';
//ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]']);
LogBox.ignoreAllLogs(true);
setGlobalStyles.showPasswordContainerStyles = {
  paddingRight: 5,
};
setGlobalStyles.containerStyles = {
  borderWidth: 2,
  borderColor: 'green',
  borderRadius: 8,
  height: 50,
  flex: 1,
};
setGlobalStyles.labelStyles = {
  // any styles you want to generalize to your floating label
  fontFamily: 'Nunito-Black',
  color: 'green',
};
setGlobalStyles.inputStyles = {
  fontFamily: 'Nunito-Medium',
  color: '#383',
  // any styles you want to generalize to your input
};
