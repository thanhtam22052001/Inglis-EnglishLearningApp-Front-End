import React from 'react';
import {Text} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import DashboardScreen from '../screens/mainMenu/DashboardScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LessonNavigator from './LessonNavigator';
import ExamNavigator from './ExamNavigator';
import PinWordDetailScreen from '../screens/pinWord/PinWordDetailScreen';
import WordDetailScreen from '../screens/dictionary/WordDetailScreen';
import PinWordScreen from '../screens/mainMenu/PinWordScreen';
import ProfileDetailScreen from '../screens/profile/ProfileDetailScreen';
import PinWordDetailWordScreen from '../screens/pinWord/PinWordDetailWordScreen';
import TermsConditionsScreen from '../screens/profile/TermsConditionsScreen';
import PrivacyPolicy from './../screens/profile/PrivacyPolicy';
import OCRScreen from '../screens/ocr/OCRScreen';
import OCRBeginScreen from '../screens/ocr/OCRBeginScreen';
import TranslateTextScreen from '../screens/translateText/TranslateTextScreen';
import DictionaryScreen from '../screens/dictionary/DictionaryScreen';
import NewsCategoryScreen from '../screens/news/NewsCategoryScreen';
import NewsListScreen from '../screens/news/NewsListScreen';
import NewsDetailScreen from '../screens/news/NewsDetailScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';

const Stack = createStackNavigator();
const getHeaderTitle = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Chào mừng bạn đến với Inglis';
    case 'Rank':
      return 'Xếp hạng';
    case 'PinWord':
      return 'Ghim từ';
    case 'Profile':
      return 'Hồ sơ của bạn';
    case 'MoreFeature':
      return 'Tính năng khác';
    default:
      return <Header title={'Error'} />;
  }
};

export default AppNavigator = props => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
    }}>
    {props.isAppFirstLaunched && (
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
    )}
    <Stack.Screen
      name="DashboardScreen"
      component={DashboardScreen}
      //initialParams={}
      options={({route}) => ({
        headerLeft: null,
        // headerRight: () => (
        //   <TouchableOpacity
        //     style={{
        //       alignSelf: 'center',
        //       alignItems: 'center',
        //       justifyContent: 'center',
        //       height: '90%',
        //       width: 40,
        //     }}
        //     onPress={() => Auth.logout()}>
        //     <AntDesign
        //       name="logout"
        //       style={{
        //         color: 'white',
        //         fontSize: 25,
        //         alignSelf: 'center',
        //       }}
        //     />
        //   </TouchableOpacity>
        // ),
        headerTitle: getHeaderTitle(route).toUpperCase(),
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
        },
      })}
    />
    <Stack.Screen
      name="LessonNavigator"
      component={LessonNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ExamNavigator"
      component={ExamNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PinWordDetailScreen"
      component={PinWordDetailScreen}
      options={({route}) => ({
        headerTitle: `THƯ MỤC ${route.params.folderName.toUpperCase()}`,
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
    />
    <Stack.Screen
      name="PinWordDetailWordScreen"
      component={PinWordDetailWordScreen}
      options={({route}) => ({
        headerTitle: `TỪ ${route.params.data.word.toUpperCase()}`,
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
    />
    <Stack.Screen
      name="WordDetailScreen"
      component={WordDetailScreen}
      options={({route}) => ({
        headerTitle: route.params.data.toUpperCase(),
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
    />
    <Stack.Screen
      name="ProfileDetailScreen"
      component={ProfileDetailScreen}
      options={({route}) => ({
        headerTitle: 'CHỈNH SỬA HỒ SƠ CỦA BẠN',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={route.params.onPressSave}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Nunito-Black',
                fontSize: 14,
              }}>
              LƯU
            </Text>
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="TermsConditionsScreen"
      component={TermsConditionsScreen}
      options={({route}) => ({
        headerTitle: 'Điều khoản & dịch vụ'.toUpperCase(),
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="PrivacyPolicyScreen"
      component={PrivacyPolicy}
      options={({route}) => ({
        headerTitle: 'CHÍNH SÁCH BẢO MẬT',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="TranslateTextScreen"
      component={TranslateTextScreen}
      options={({route}) => ({
        headerTitle: 'DỊCH BẰNG TEXT',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="OCRScreen"
      component={OCRScreen}
      options={({route}) => ({
        headerTitle: 'DỊCH BẰNG OCR',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="OCRBeginScreen"
      component={OCRBeginScreen}
      options={({route}) => ({
        headerTitle: 'BẮT ĐẦU DỊCH VỚI OCR',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="DictionaryScreen"
      component={DictionaryScreen}
      options={({route}) => ({
        headerTitle: 'TỪ ĐIỂN',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="NewsCategoryScreen"
      component={NewsCategoryScreen}
      options={({route}) => ({
        headerTitle: 'TẤT CẢ CÁC DANH MỤC',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',

        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="NewsListScreen"
      component={NewsListScreen}
      options={({route}) => ({
        headerTitle: route.params.isSearch
          ? 'TÌM KIẾM: ' + route.params.searchQuery
          : 'ĐỀ XUẤT CHO BẠN',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="NewsDetailScreen"
      component={NewsDetailScreen}
      options={({route}) => ({
        headerTitle: 'ĐỌC TIN TỨC',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
        },
        headerTintColor: 'white',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              Share.open({
                message:
                  'Bạn hãy cùng luyện kĩ năng ngôn ngữ Anh qua bài báo này cùng INGLIS nhé!',
                title: 'Chia sẻ đường link của bài báo này',
                url: route.params.data.url,
              })
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  err && console.error(err);
                });
            }}
            style={{
              // backgroundColor: 'red',
              height: '100%',
              justifyContent: 'center',
              width: 45,
            }}>
            <FontAwesome
              style={[
                {
                  fontSize: 30,
                  paddingRight: 5,
                  color: 'white',
                },
              ]}
              name={'paper-plane'}
            />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
      //options={{headerShown: false}}
    />
    <Stack.Screen
      name="PinWordScreen"
      component={PinWordScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
