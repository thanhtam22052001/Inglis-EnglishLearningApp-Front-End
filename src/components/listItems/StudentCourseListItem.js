import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const StudentCourseListItem = props => {
  const getStyleIndex = index => {
    switch (index) {
      case 1:
        return [
          styles.container,
          {
            borderRadius: 10,
            backgroundColor: '#FFFEEF',
            borderWidth: 2,
            borderColor: 'gold',
          },
        ];
      case 2:
        return [
          styles.container,
          {
            borderRadius: 10,
            backgroundColor: '#ECFBFF',
            borderWidth: 2,
            borderColor: 'dodgerblue',
          },
        ];
      case 3:
        return [
          styles.container,
          {
            borderRadius: 10,
            backgroundColor: '#FEEEEE',
            borderWidth: 2,
            borderColor: 'red',
          },
        ];
      default:
        return [styles.container];
    }
  };
  const renderIndex = index => {
    switch (index) {
      case 1:
        return (
          <View style={[styles.outterContainer]}>
            <View style={styles.innerContainer}>
              <Text style={[styles.id, {color: 'gold'}]}>{props.id}</Text>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../../assets/images/ranks/crownFirst.png')}
                  style={styles.crown}
                />
                <Image
                  source={require('../../assets/images/AdBannerImageForDebug.png')}
                  style={[styles.avatar, {borderColor: 'gold'}]}
                />
              </View>
              <Text style={[styles.name, {color: 'gold'}]}>{props.name}</Text>
            </View>
            <View style={styles.textEndContainer}>
              <Text style={styles.textEnd}>{props.wordCorrect} từ đúng</Text>
              <Text style={styles.textEnd}>
                Thời gian: {props.timeCompleted}
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.outterContainer}>
            <View style={styles.innerContainer}>
              <Text style={[styles.id, {color: 'dodgerblue'}]}>{props.id}</Text>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../../assets/images/ranks/crownSecond.png')}
                  style={styles.crown}
                />
                <Image
                  source={require('../../assets/images/AdBannerImageForDebug.png')}
                  style={[styles.avatar, {borderColor: 'dodgerblue'}]}
                />
              </View>
              <Text style={[styles.name, {color: 'dodgerblue'}]}>
                {props.name}
              </Text>
            </View>
            <View style={styles.textEndContainer}>
              <Text style={styles.textEnd}>{props.wordCorrect} từ đúng</Text>
              <Text style={styles.textEnd}>
                Thời gian: {props.timeCompleted}
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.outterContainer}>
            <View style={styles.innerContainer}>
              <Text style={[styles.id, {color: 'red'}]}>{props.id}</Text>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../../assets/images/ranks/crownThird.png')}
                  style={styles.crown}
                />
                <Image
                  source={require('../../assets/images/AdBannerImageForDebug.png')}
                  style={[styles.avatar, {borderColor: 'red'}]}
                />
              </View>
              <Text style={[styles.name, {color: 'red'}]}>{props.name}</Text>
            </View>
            <View style={styles.textEndContainer}>
              <Text style={styles.textEnd}>{props.wordCorrect} từ đúng</Text>
              <Text style={styles.textEnd}>
                Thời gian: {props.timeCompleted}
              </Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.outterContainer}>
            <View style={styles.innerContainer}>
              <Text style={[styles.id]}>{props.id}</Text>
              <View style={styles.avatarContainer}>
                <Image style={styles.crown} />
                <Image
                  source={require('../../assets/images/AdBannerImageForDebug.png')}
                  style={styles.avatar}
                />
              </View>
              <Text style={styles.name}>{props.name}</Text>
            </View>
            <View style={styles.textEndContainer}>
              <Text style={styles.textEnd}>{props.wordCorrect} từ đúng</Text>
              <Text style={styles.textEnd}>
                Thời gian: {props.timeCompleted}
              </Text>
            </View>
          </View>
        );
    }
  };
  return (
    <View
      style={
        props.isUser
          ? [
              styles.container,
              {
                borderRadius: 10,
                backgroundColor: '#cbedcb',
                borderWidth: 2,
                borderColor: 'green',
              },
            ]
          : getStyleIndex(props.id)
      }>
      {props.isUser ? (
        <View style={styles.outterContainer}>
          <View style={styles.innerContainer}>
            <Text style={[styles.id, {color: 'green'}]}>{props.id}</Text>
            <View style={styles.avatarContainer}>
              <Image style={styles.crown} />
              <Image
                source={require('../../assets/images/AdBannerImageForDebug.png')}
                style={styles.avatar}
              />
            </View>
            <Text style={[styles.name, {color: 'green'}]}>{props.name}</Text>
          </View>
          <View style={styles.textEndContainer}>
            <Text style={styles.textEnd}>{props.wordCorrect} từ đúng</Text>
            <Text style={styles.textEnd}>Thời gian: {props.timeCompleted}</Text>
          </View>
        </View>
      ) : (
        renderIndex(props.id)
      )}
    </View>
  );
};

export default StudentCourseListItem;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 90,
    alignSelf: 'center',
    marginVertical: 10,
  },
  outterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingRight: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    // paddingTop: 10,
    // paddingBottom: '5%',
    //paddingRight: 10,
    paddingLeft: 10,
  },
  id: {
    fontFamily: 'Nunito-Black',
    fontSize: 17,
    paddingTop: '5%',
  },
  avatarContainer: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  avatar: {width: 40, height: 40, borderRadius: 40, borderWidth: 2},
  crown: {width: 20, height: 20},
  name: {paddingTop: '5%', fontSize: 16, fontFamily: 'Nunito-Black'},
  rankContainer: {paddingTop: '7%'},
  textEndContainer: {alignItems: 'flex-end'},
  textEnd: {fontFamily: 'Nunito-Bold'},
});
