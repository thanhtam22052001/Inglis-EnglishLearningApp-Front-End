import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LessonScreenFlashcard from '../screens/courses/lessons/LessonScreenFlashcard';
import LessonProgressBarHeader from '../components/headers/LessonProgressBarHeader';
import LessonCompleteScreen from '../screens/courses/lessons/LessonCompleteScreen';
import CourseScreen from '../screens/courses/CourseScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LessonScreenTyping from './../screens/courses/lessons/LessonScreenTyping';
import LessonScreenGuessing from './../screens/courses/lessons/LessonScreenGuessing';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PinWordScreen from '../screens/mainMenu/PinWordScreen';
import LessonScreenPronunciation from '../screens/courses/lessons/LessonScreenPronunciation';
import LessonScreenSentence from '../screens/courses/lessons/LessonScreenSentence';
import LessonScreenDefinition from '../screens/courses/lessons/LessonScreenDefinition';

const Stack = createStackNavigator();
export default LessonNavigator = ({navigation}) => (
  <Stack.Navigator
    initialRouteName="CourseScreen"
    screenOptions={{
      headerShown: true,
    }}>
    <Stack.Screen
      name="CourseScreen"
      component={CourseScreen}
      options={({route}) => ({
        headerTitle: route.params.title,
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
      name="LessonScreenFlashcard"
      component={LessonScreenFlashcard}
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
      name="LessonScreenTyping"
      component={LessonScreenTyping}
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
      name="LessonScreenGuessing"
      component={LessonScreenGuessing}
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
      name="LessonScreenDefinition"
      component={LessonScreenDefinition}
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
      name="LessonScreenSentence"
      component={LessonScreenSentence}
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
      name="LessonScreenPronunciation"
      component={LessonScreenPronunciation}
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
      name="LessonCompleteScreen"
      component={LessonCompleteScreen}
      options={({route}) => ({
        headerLeft: () => (
          <TouchableOpacity
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
        headerTitle: '',
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
      name="PinWordScreen"
      component={PinWordScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
