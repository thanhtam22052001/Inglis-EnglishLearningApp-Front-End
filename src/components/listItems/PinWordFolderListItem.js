import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ProgressBar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const PinWordFolderListItem = props => {
  return (
    <View
      style={[
        {flexDirection: 'row', width: '100%', paddingVertical: 5},
        props.style,
      ]}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          height: 100,
        }}
        onPress={props.onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('../../assets/images/AdBannerImageForDebug.png')}
            style={styles.image}
          />
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignSelf: 'center',
                height: 70,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.title}>{props.name}</Text>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <AntDesign
                    name={'pushpin'}
                    style={[
                      {
                        fontSize: 15,
                        paddingRight: 5,
                      },
                      // props.numWords === 20
                      //   ? {color: 'red', fontFamily: 'Nunito-Black'}
                      //   : {},
                    ]}
                  />
                  <Text
                    style={[
                      {paddingBottom: 20, fontFamily: 'Nunito-Medium'},
                      // props.numWords === 20
                      //   ? {color: 'red', fontFamily: 'Nunito-Black'}
                      //   : {},
                    ]}>
                    Đã ghim: {props.numWords != null ? props.numWords : 0} từ
                  </Text>
                </View>
                {/* {props.numWords !== 0 ? (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <FontAwesome5
                        name={'book-reader'}
                        style={[
                          {
                            fontSize: 15,
                            paddingRight: 5,
                          },
                          props.progress === props.numWords
                            ? {color: 'green', fontFamily: 'Nunito-Black'}
                            : {},
                        ]}
                      />
                      <Text
                        style={[
                          {paddingBottom: 3, fontFamily: 'Nunito-Medium'},
                          props.progress === props.numWords
                            ? {color: 'green', fontFamily: 'Nunito-Black'}
                            : {},
                        ]}>
                        Bạn đã ôn: {props.progress != null ? props.progress : 0}{' '}
                        / {props.numWords} từ đã ghim
                      </Text>
                    </View>

                    <ProgressBar
                      color={'green'}
                      style={{height: 10, borderRadius: 10}}
                      progress={
                        props.progress /
                        (props.numWords === 0 ? 1 : props.numWords)
                      }
                    />
                  </View>
                ) : (
                  <View />
                )} */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingTop: 10,
          width: '10%',
        }}
        onPress={props.onPressSettings}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Image
            source={require('../../assets/images/Setting.png')}
            style={{width: 30, height: 30}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PinWordFolderListItem;

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    aspectRatio: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  title: {fontFamily: 'Nunito-Black', fontSize: 16},
});
