import {StyleSheet, Text, View, Image} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import React from 'react';

const LearningCategoryCard = props => {
  const getIcon = type => {
    switch (type) {
      case 'SD':
        return (
          <Image
            source={require('../../assets/images/Guessing.png')}
            style={styles.icon}
          />
        );
      case 'GT':
        return (
          <Image
            source={require('../../assets/images/Typing.png')}
            style={styles.icon}
          />
        );
      case 'FC':
        return (
          <Image
            source={require('../../assets/images/Flashcard.png')}
            style={styles.icon}
          />
        );
      case 'STT':
        return (
          <Image
            source={require('../../assets/images/Pronunciation.png')}
            style={styles.icon}
          />
        );
      case 'ST':
        return (
          <Image
            source={require('../../assets/images/Sentence.png')}
            style={styles.icon}
          />
        );
      case 'GM':
        return (
          <Image
            source={require('../../assets/images/Definition.png')}
            style={styles.icon}
          />
        );
    }
  };
  return (
    <AwesomeButton
      springRelease
      borderRadius={10}
      activeOpacity={0.8}
      backgroundDarker={props.borderColor}
      borderWidth={1}
      borderColor={props.borderColor}
      backgroundColor={props.backgroundColor}
      onPress={props.onPress}
      height={180}
      stretch={true}
      width={null}>
      <View style={styles.content}>
        <View
          style={{
            backgroundColor: props.textBackground,
            height: '30%',
            width: '100%',
            borderRadius: 9,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              color: props.textColor,
              padding: 5,
              fontFamily: 'Nunito-Black',
            }}>
            {props.text}
          </Text>
        </View>
        <View height={15} />
        {getIcon(props.type)}
      </View>
    </AwesomeButton>
  );
};

export default LearningCategoryCard;

const styles = StyleSheet.create({
  icon: {
    width: '60%',
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 5,
  },
});
