import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {getRank} from './../../services/rankService';
const StudentListItem = props => {
  const renderIndex = index => {
    if (props.isUser === false)
      switch (index) {
        case 1:
          return (
            <View style={stylesForNotUser.outsideContainer}>
              <View style={stylesForNotUser.container}>
                <Text style={[stylesForNotUser.rankNumber, {color: 'gold'}]}>
                  {props.rankNum}
                </Text>
                <View style={stylesForNotUser.avatarContainer}>
                  <Image
                    source={require('../../assets/images/ranks/crownFirst.png')}
                    style={stylesForNotUser.crown}
                  />
                  <Image
                    source={require('../../assets/images/AdBannerImageForDebug.png')}
                    style={stylesForNotUser.avatar}
                  />
                </View>
                <Text style={stylesForNotUser.name}>{props.name}</Text>
              </View>
              <View style={stylesForNotUser.rankContainer}>
                <Image
                  source={getRank(props.level)}
                  style={stylesForNotUser.level}
                />
              </View>
            </View>
          );
        case 2:
          return (
            <View style={stylesForNotUser.outsideContainer}>
              <View style={stylesForNotUser.container}>
                <Text style={[stylesForNotUser.rankNumber, {color: 'blue'}]}>
                  {props.rankNum}
                </Text>
                <View style={stylesForNotUser.avatarContainer}>
                  <Image
                    source={require('../../assets/images/ranks/crownSecond.png')}
                    style={stylesForNotUser.crown}
                  />
                  <Image
                    source={require('../../assets/images/AdBannerImageForDebug.png')}
                    style={stylesForNotUser.avatar}
                  />
                </View>
                <Text style={stylesForNotUser.name}>{props.name}</Text>
              </View>
              <View style={stylesForNotUser.rankContainer}>
                <Image
                  source={getRank(props.level)}
                  style={stylesForNotUser.level}
                />
              </View>
            </View>
          );
        case 3:
          return (
            <View style={stylesForNotUser.outsideContainer}>
              <View style={stylesForNotUser.container}>
                <Text style={[stylesForNotUser.rankNumber, {color: 'red'}]}>
                  {props.rankNum}
                </Text>
                <View style={stylesForNotUser.avatarContainer}>
                  <Image
                    source={require('../../assets/images/ranks/crownThird.png')}
                    style={stylesForNotUser.crown}
                  />
                  <Image
                    source={require('../../assets/images/AdBannerImageForDebug.png')}
                    style={stylesForNotUser.avatar}
                  />
                </View>
                <Text style={stylesForNotUser.name}>{props.name}</Text>
              </View>
              <View style={stylesForNotUser.rankContainer}>
                <Image
                  source={getRank(props.level)}
                  style={stylesForNotUser.level}
                />
              </View>
            </View>
          );
        default:
          return (
            <View style={stylesForNotUser.outsideContainer}>
              <View style={stylesForNotUser.container}>
                <Text style={stylesForNotUser.rankNumber}>{props.rankNum}</Text>
                <View style={stylesForNotUser.avatarContainer}>
                  <View style={stylesForNotUser.crown} />
                  <Image
                    source={require('../../assets/images/AdBannerImageForDebug.png')}
                    style={stylesForNotUser.avatar}
                  />
                </View>
                <Text style={stylesForNotUser.name}>{props.name}</Text>
              </View>
              <View style={stylesForNotUser.rankContainer}>
                <Image
                  source={getRank(props.level)}
                  style={stylesForNotUser.level}
                />
              </View>
            </View>
          );
      }
    else if (props.isUser === true)
      switch (index) {
        case 1:
          return (
            <View style={stylesForUser.outsideContainer}>
              <View style={stylesForUser.container}>
                <Text style={[stylesForUser.rankNumber, {color: 'gold'}]}>
                  {props.rankNum}
                </Text>
                <View style={stylesForUser.avatarContainer}>
                  <Image
                    source={require('../../assets/images/ranks/crownFirst.png')}
                    style={stylesForUser.crown}
                  />
                  <Image
                    source={require('../../assets/images/AdBannerImageForDebug.png')}
                    style={stylesForUser.avatar}
                  />
                </View>
                <Text style={stylesForUser.name}>{props.name}</Text>
              </View>
              <View style={stylesForUser.rankContainer}>
                <Image
                  source={getRank(props.level)}
                  style={stylesForUser.level}
                />
              </View>
            </View>
          );
        case 2:
          return (
            <View style={stylesForUser.outsideContainer}>
              <View style={stylesForUser.container}>
                <Text style={[stylesForUser.rankNumber, {color: 'blue'}]}>
                  {props.rankNum}
                </Text>
                <View style={stylesForUser.avatarContainer}>
                  <Image
                    source={require('../../assets/images/ranks/crownSecond.png')}
                    style={stylesForUser.crown}
                  />
                  <Image
                    source={require('../../assets/images/AdBannerImageForDebug.png')}
                    style={stylesForUser.avatar}
                  />
                </View>
                <Text style={stylesForUser.name}>{props.name}</Text>
              </View>
              <View style={stylesForUser.rankContainer}>
                <Image
                  source={getRank(props.level)}
                  style={stylesForUser.level}
                />
              </View>
            </View>
          );
        case 3:
          return (
            <View style={stylesForUser.outsideContainer}>
              <View style={stylesForUser.container}>
                <Text style={[stylesForUser.rankNumber, {color: 'red'}]}>
                  {props.rankNum}
                </Text>
                <View style={stylesForUser.avatarContainer}>
                  <Image
                    source={require('../../assets/images/ranks/crownThird.png')}
                    style={stylesForUser.crown}
                  />
                  <Image
                    source={require('../../assets/images/AdBannerImageForDebug.png')}
                    style={stylesForUser.avatar}
                  />
                </View>
                <Text style={stylesForUser.name}>{props.name}</Text>
              </View>
              <View style={stylesForUser.rankContainer}>
                <Image
                  source={getRank(props.level)}
                  style={stylesForUser.level}
                />
              </View>
            </View>
          );
        default:
          return (
            <View style={stylesForUser.outsideContainer}>
              <View style={stylesForUser.container}>
                <Text style={stylesForUser.rankNumber}>{props.rankNum}</Text>
                <View style={stylesForUser.avatarContainer}>
                  <View style={stylesForUser.crown} />
                  <Image
                    source={require('../../assets/images/AdBannerImageForDebug.png')}
                    style={stylesForUser.avatar}
                  />
                </View>
                <Text style={stylesForUser.name}>{props.name}</Text>
              </View>
              <View style={stylesForUser.rankContainer}>
                <Image
                  source={getRank(props.level)}
                  style={stylesForUser.level}
                />
              </View>
            </View>
          );
      }
  };
  return renderIndex(props.rankNum);
};
const stylesForNotUser = StyleSheet.create({
  outsideContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '95%',
    paddingLeft: 10,
    paddingBottom: 10,

    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 10,
    // borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 5,
  },
  rankNumber: {fontFamily: 'Nunito-Black', paddingTop: '10%', width: 20},
  avatarContainer: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  avatar: {width: 40, height: 40, borderRadius: 40},
  crown: {width: 30, height: 30},
  name: {paddingTop: '10%', fontFamily: 'Nunito-Black', fontSize: 16},
  level: {width: 50, height: 50, paddingTop: '10%'},
  rankContainer: {paddingTop: '7%'},
});
const stylesForUser = StyleSheet.create({
  outsideContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    elevation: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    paddingBottom: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 5,
  },
  rankNumber: {fontFamily: 'Nunito-Black', paddingTop: '10%', width: 20},
  avatarContainer: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  avatar: {width: 40, height: 40, borderRadius: 40},
  crown: {width: 30, height: 30},
  name: {
    paddingTop: '10%',
    fontFamily: 'Nunito-Black',
    fontSize: 16,
    color: 'darkgreen',
  },
  level: {width: 50, height: 50, paddingTop: '10%'},
  rankContainer: {paddingTop: '7%'},
});
export default StudentListItem;
