import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CourseInfo from './CourseInfo';
import CourseRank from './CourseRank';
const Tab = createMaterialTopTabNavigator();
const CourseScreen = ({navigation, route}) => {
  const {courseId, title} = route.params;
  return (
    <Tab.Navigator
      initialRouteName="Tổng quan"
      screenOptions={{
        tabBarLabelStyle: {fontFamily: 'Nunito-Black'},
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'grey',
        tabBarIndicatorStyle: {
          color: 'red',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'green',
          height: 2,
        },
      }}
      tabBarBounces>
      <Tab.Screen
        name="Tổng quan"
        component={CourseInfo}
        initialParams={{courseId: courseId}}
      />
      <Tab.Screen
        name="Xếp hạng"
        component={CourseRank}
        initialParams={{courseId: courseId}}
      />
    </Tab.Navigator>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({});
