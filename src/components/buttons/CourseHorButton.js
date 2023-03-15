import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
const CourseHorizontalButton = props => {
  return (
    <View
      flexDirection="row"
      style={{
        paddingTop: props.paddingTop,
        height: props.height,
        width: props.width,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AwesomeButton
        springRelease
        borderRadius={10}
        onPress={props.onPress}
        activeOpacity={0.8}
        backgroundDarker={props.color}
        borderWidth={1}
        borderColor={props.color}
        backgroundColor={'#fff'}
        stretch={true}
        height={props.height}
        width={null}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            padding: 10,
            width: '100%',
          }}>
          <Image
            source={{uri: props.source + ''}}
            style={{width: 80, height: 80, borderRadius: 10}}
          />

          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: props.color,
                textAlign: 'left',
                paddingHorizontal: 5,
                fontFamily: 'Nunito-Black',
              }}>
              {props.title}
            </Text>
            <Text style={styles.level}>CẤP ĐỘ {props.level}</Text>
            {/* <ProgressBar
              paddingHorizontal={5}
              progress={props.progress}
              color={'#1899D6'}
            /> */}
          </View>
          <View height={15} />
        </View>
      </AwesomeButton>
    </View>
  );
};

export default CourseHorizontalButton;

const styles = StyleSheet.create({
  level: {
    textAlign: 'center',
    fontSize: 11,
    color: '#1899D6',
    paddingHorizontal: 5,
    textAlign: 'left',
    fontFamily: 'Nunito-Medium',
  },
});
