import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
const getIcon = type => {
  switch (type) {
    case 'XP':
      return (
        <Image
          source={require('../../assets/images/Course.png')}
          style={styles.icon}
        />
      );

    case 'A0':
      return (
        <Image
          source={require('../../assets/images/ranks/A0.png')}
          style={styles.icon}
        />
      );
    case 'A1':
      return (
        <Image
          source={require('../../assets/images/ranks/A1.png')}
          style={styles.icon}
        />
      );
    case 'A2':
      return (
        <Image
          source={require('../../assets/images/ranks/A2.png')}
          style={styles.icon}
        />
      );
    case 'B1':
      return (
        <Image
          source={require('../../assets/images/ranks/B1.png')}
          style={styles.icon}
        />
      );
    case 'B2':
      return (
        <Image
          source={require('../../assets/images/ranks/B2.png')}
          style={styles.icon}
        />
      );
    case 'C1':
      return (
        <Image
          source={require('../../assets/images/ranks/C1.png')}
          style={styles.icon}
        />
      );
    case 'C2':
      return (
        <Image
          source={require('../../assets/images/ranks/C2.png')}
          style={styles.icon}
        />
      );
    case 'RANK':
      return (
        <Image
          source={require('../../assets/images/Rank.png')}
          style={styles.icon}
        />
      );

    case 'WORD':
      return (
        <Image
          source={require('../../assets/images/Word.png')}
          style={styles.icon}
        />
      );
  }
};
const StatisticPanel = props => {
  return (
    <View style={styles.container}>
      <View width={3} />
      {getIcon(props.type)}
      <View width={5} />
      <View>
        <Text style={styles.value}>{props.value}</Text>
        <Text style={styles.titleCard}>{props.name}</Text>
      </View>
    </View>
  );
};

export default StatisticPanel;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'lightgrey',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 20,
    color: 'grey',
    fontFamily: 'Nunito-Black',
  },
  titleCard: {color: 'grey', fontFamily: 'Nunito-Medium'},
  icon: {
    width: 37,
    height: 37,
  },
});
