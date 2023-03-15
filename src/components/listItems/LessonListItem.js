import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AwesomeButton from 'react-native-really-awesome-button-fixed';

const LessonListItem = props => {
  return (
    <View style={{width: '95%', alignSelf: 'center', paddingVertical: 5}}>
      <AwesomeButton
        springRelease
        borderRadius={10}
        onPress={props.onPress}
        activeOpacity={0.8}
        borderWidth={1}
        backgroundDarker={props.isLearned != null ? 'lightgreen' : 'green'}
        borderColor={'green'}
        backgroundColor={props.isLearned ? 'green' : 'white'}
        stretch={true}
        height={props.height}
        width={null}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              paddingLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              maxWidth: '70%',
            }}>
            <Image source={props.source} style={styles.image} />
            <Text
              style={[
                styles.name,
                {color: props.isLearned ? 'white' : 'green'},
              ]}>
              {props.name}
            </Text>
          </View>
          <AntDesign
            name="caretright"
            style={[styles.icon, {color: props.isLearned ? 'white' : 'green'}]}
          />
        </View>
      </AwesomeButton>
    </View>
  );
};

export default LessonListItem;

const styles = StyleSheet.create({
  image: {width: 70, height: 70, borderRadius: 5},
  icon: {fontSize: 30, paddingRight: 10},
  name: {
    paddingLeft: 10,
    fontFamily: 'Nunito-Black',
    fontSize: 15,
  },
});
