import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import SignInScreen from './../screens/auth/SignInScreen';
import SignUpScreen from './../screens/auth/SignUpScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default AuthNavigator = props => (
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
    {/* <Stack.Screen
      name="OnboardingScreen"
      component={OnboardingScreen}
      options={{headerShown: false}}
    /> */}
    <Stack.Screen
      name="SignInScreen"
      component={SignInScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
      options={{
        headerTitle: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: 'white',
        },
      }}
    />
  </Stack.Navigator>
);
