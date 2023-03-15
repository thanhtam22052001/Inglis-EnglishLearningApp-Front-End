import {StyleSheet, Text, View} from 'react-native';
import {setInformationInData} from '../../services/flatlistService';
import React from 'react';

const CourseDetailsPanel = props => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'lightgrey',
        height: 'auto',
        width: '95%',
      }}>
      <Text style={styles.title}>Nội dung khoá học</Text>
      {setInformationInData(props.information)}
    </View>
  );
};

export default CourseDetailsPanel;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nunito-Black',
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
  },
});
