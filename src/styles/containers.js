import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const root = {
  alignItems: 'center',
  padding: 20,
  backgroundColor: 'white',
};
export const rootPage = {
  alignItems: 'center',
};
export const slide = {
  alignItems: 'center',
};
export const header = {
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
export const footer = {
  height: height * 0.25,
  justifyContent: 'space-between',
  paddingHorizontal: 20,
};
export const scrollViewContainer = {
  width: '100%',
  backgroundColor: 'white',
};
