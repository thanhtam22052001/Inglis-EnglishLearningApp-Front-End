import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LessonProgressBarHeader from '../components/headers/LessonProgressBarHeader';
import ExamScreenTyping from './../screens/exams/ExamScreenTyping';
import ExamScreenGuessing from './../screens/exams/ExamScreenGuessing';
import ExamStartScreen from '../screens/exams/ExamStartScreen';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExamCompleteScreen from '../screens/exams/ExamCompleteScreen';
const Stack = createStackNavigator();
export default ExamNavigator = ({navigation}) => (
  <Stack.Navigator
    initialRouteName="ExamStartScreen"
    screenOptions={{
      headerShown: true,
    }}>
    <Stack.Screen
      name="ExamStartScreen"
      component={ExamStartScreen}
      // options={{headerShown: false}}
      options={({route}) => ({
        headerTitle: 'BẮT ĐẦU KIỂM TRA',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'green',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomWidth: 5,
          borderBottomColor: 'lightgreen',
          //textA: 'center',
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Nunito-Black',
          fontSize: 14,
        },
      })}
    />
    <Stack.Screen
      name="ExamScreenTyping"
      component={ExamScreenTyping}
      //options={{headerShown: false}}
      options={({route}) => ({
        header: () => (
          <LessonProgressBarHeader
            progress={route.params.progress}
            onPress={route.params.exitLesson}
            maxNumWords={route.params.maxNumWords}
            currentWordId={route.params.wordId}
          />
        ),
      })}
    />
    <Stack.Screen
      name="ExamScreenGuessing"
      component={ExamScreenGuessing}
      //options={{headerShown: false}}
      options={({route}) => ({
        header: () => (
          <LessonProgressBarHeader
            progress={route.params.progress}
            onPress={route.params.exitLesson}
            maxNumWords={route.params.maxNumWords}
            currentWordId={route.params.wordId}
          />
        ),
      })}
    />
    <Stack.Screen
      name="ExamCompleteScreen"
      component={ExamCompleteScreen}
      //options={{headerShown: false}}
      options={({route}) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={route.params.exitLesson}
            style={{
              //backgroundColor: 'red',
              height: '100%',
              justifyContent: 'center',
            }}>
            <Ionicons
              name={'arrow-back'}
              style={{fontSize: 30, color: 'white', paddingLeft: 10}}
              onPress={route.params.onPress}
            />
          </TouchableOpacity>
        ),
        headerTitle: 'BẠN ĐÃ HOÀN THÀNH BÀI KIỂM TRA',
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
  </Stack.Navigator>
);
