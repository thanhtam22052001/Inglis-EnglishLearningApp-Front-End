import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {texts} from '../../styles';
import DictionaryScreen from '../dictionary/DictionaryScreen';
import HomeScreen from './HomeScreen';
import PinWordScreen from './PinWordScreen';
import RankScreen from './RankScreen';
import UserScreen from './UserScreen';
import MoreFeatureScreen from './MoreFeatureScreen';
const Tab = createMaterialBottomTabNavigator();
const DEVICE_WIDTH = Dimensions.get('window').width;

const DashboardScreen = () => {
  const [backPressedCount, setBackPressedCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        setBackPressedCount(backPressedCount => backPressedCount + 1);
        return true;
      });
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', () => true);
    }, []),
  );

  useEffect(() => {
    if (backPressedCount === 1) {
      ToastAndroid.show(
        'Nhấn quay lại thêm một lần nữa để thoát',
        ToastAndroid.SHORT,
      );
    } else if (backPressedCount === 2) {
      BackHandler.exitApp();
    }
  }, [backPressedCount]);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="green"
      screenOptions={{
        headerMode: 'screen',
      }}
      barStyle={{
        backgroundColor: 'white',
        position: 'absolute',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 30,
        bottom: 0,
        width: DEVICE_WIDTH,
        height: 55,
        zIndex: 8,
      }}
      options={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Nunito-Black',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: (
            <Text style={[texts.tabBarLabel, {color: 'darkorange'}]}>
              Trang chủ
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Image
                  source={require('../../assets/images/Home.png')}
                  style={{width: 27, height: 27}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/HomeDisabled.png')}
                  style={{width: 27, height: 27}}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Rank"
        component={RankScreen}
        options={{
          tabBarLabel: (
            <Text style={[texts.tabBarLabel, {color: 'goldenrod'}]}>
              Xếp hạng
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Image
                  source={require('../../assets/images/Rank.png')}
                  style={{width: 27, height: 27}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/RankDisabled.png')}
                  style={{width: 27, height: 27}}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PinWord"
        component={PinWordScreen}
        initialParams={{
          isModal: false,
          wordData: {
            word: '',
            type: '',
            definition: '',
            pronunciation: '',
            meaning: '',
            example: '',
            exampleMeaning: '',
            wordUri: '',
          },
        }}
        options={({route}) => ({
          tabBarLabel: (
            <Text style={[texts.tabBarLabel, {color: 'deeppink'}]}>
              Ghim từ
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Image
                  source={require('../../assets/images/Pin.png')}
                  style={{width: 27, height: 27}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/PinDisabled.png')}
                  style={{width: 27, height: 27}}
                />
              )}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="MoreFeature"
        component={MoreFeatureScreen}
        options={{
          tabBarLabel: (
            <Text style={[texts.tabBarLabel, {color: 'dodgerblue'}]}>Khác</Text>
          ),
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Image
                  source={require('../../assets/images/MoreFeature.png')}
                  style={{width: 27, height: 27}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/MoreFeatureDisabled.png')}
                  style={{width: 27, height: 27}}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserScreen}
        options={{
          tabBarLabel: (
            <Text style={[texts.tabBarLabel, {color: 'green'}]}>Tài khoản</Text>
          ),
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <Image
                  source={require('../../assets/images/User.png')}
                  style={{width: 27, height: 27}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/UserDisabled.png')}
                  style={{width: 27, height: 27}}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default DashboardScreen;
