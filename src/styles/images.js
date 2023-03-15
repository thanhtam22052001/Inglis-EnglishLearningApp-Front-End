import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const title = {
  maxHeight: 300,
  maxWidth: 300,
  resizeMode: 'contain',
};
export const slide = {
  height: '75%',
  width,
  resizeMode: 'contain',
};
