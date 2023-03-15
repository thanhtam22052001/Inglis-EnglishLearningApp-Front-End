import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import {colors} from '../../styles';
const CourseVerticalButton = props => {
  return (
    <View style={styles.container}>
      <AwesomeButton
        onPress={props.onPress}
        springRelease
        borderRadius={10}
        activeOpacity={0.8}
        backgroundDarker={colors.primary}
        borderWidth={1}
        borderColor={colors.primary}
        backgroundColor={'#fff'}
        height={225}
        stretch
        width={null}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: 1,
            height: '100%',
            padding: 5,
          }}>
          <Image
            source={{uri: props.source + ''}}
            style={{
              width: '100%',
              height: '30%',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          />
          <View
            style={{
              height: '70%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderRadius: 5,
            }}>
            <Text style={styles.title}>{props.title}</Text>
            <View>
              <Text style={styles.numLesson}>{props.numLesson} lessons</Text>
              <View height={10} />
              <Text style={styles.level}>Cấp độ {props.level}</Text>
              <Text style={styles.description}>{props.description}</Text>
            </View>
          </View>
        </View>
      </AwesomeButton>
    </View>
  );
};

export default CourseVerticalButton;

const styles = StyleSheet.create({
  container: {
    width: '46%',
  },
  level: {
    width: '100%',
    textAlign: 'left',
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'Nunito-Black',
  },
  numLesson: {
    width: '100%',
    textAlign: 'left',
    fontSize: 12,
    color: '#1899D6',
    fontFamily: 'Nunito-Black',
  },
  title: {
    width: '100%',
    textAlign: 'left',
    fontSize: 15,
    color: '#000',
    paddingVertical: 5,
    fontFamily: 'Nunito-Black',
  },
  description: {
    textAlign: 'left',
    fontSize: 9,
    fontFamily: 'Nunito-Medium',
  },
});
