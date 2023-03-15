import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const CourseStatisticPanel = props => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 2,
        width: '30%',
        height: 80,
        borderColor: props.color,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={props.source} style={styles.icon} />
        <Text style={[styles.numberDone, {color: props.color}]}>
          {props.numDone ?? 0}
        </Text>
        <Text style={[styles.numberNotDone, {color: props.color}]}>
          /{props.numNotDone ?? 0}
        </Text>
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default CourseStatisticPanel;

const styles = StyleSheet.create({
  icon: {width: 30, height: 30},
  text: {fontSize: 10, fontFamily: 'Nunito-Black'},
  numberDone: {fontSize: 35, fontFamily: 'Nunito-Bold'},
  numberNotDone: {
    fontSize: 15,
    fontFamily: 'Nunito-Black',
    alignSelf: 'flex-end',
    paddingBottom: 10,
  },
});
