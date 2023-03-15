import {
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {LogBox} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Auth from '../services/authService';

const Stack = createStackNavigator();
const ApplicationNavigator = props => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1011722414549-9kj4ksfibirkc1ajtnmpi3797uq8cmjp.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <AuthNavigator isAppFirstLaunched={props.isAppFirstLaunched} />
      </NavigationContainer>
    );
  }
  Auth.check_User_Exist();
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
export default ApplicationNavigator;
