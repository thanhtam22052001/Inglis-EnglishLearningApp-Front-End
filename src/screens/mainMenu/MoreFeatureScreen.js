import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button-fixed';

const MoreFeatureScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '90%',
          height: '90%',
          //flex: 1,
          //backgroundColor: 'red',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <AwesomeButton
          height={100}
          borderRadius={10}
          width={null}
          stretch
          backgroundColor="white"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.push('TranslateTextScreen');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/images/Translate.png')}
              resizeMode="contain"
              style={{aspectRatio: 1, width: 80, marginLeft: 10}}
            />
            <Text
              style={[
                styles.title,
                {color: 'darkgreen', paddingLeft: 5, marginLeft: 10},
              ]}>
              DỊCH BẰNG TEXT
            </Text>
          </View>
        </AwesomeButton>
        <View height={10} />
        <AwesomeButton
          height={100}
          borderRadius={10}
          width={null}
          stretch
          backgroundColor="white"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.push('OCRBeginScreen');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/images/OCR.png')}
              style={{aspectRatio: 1, width: 80, marginLeft: 10}}
            />
            <Text
              style={[
                styles.title,
                {color: 'darkgreen', paddingLeft: 5, marginLeft: 10},
              ]}>
              DỊCH BẰNG OCR
            </Text>
          </View>
        </AwesomeButton>
        <AwesomeButton
          height={100}
          borderRadius={10}
          width={null}
          stretch
          backgroundColor="white"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.push('DictionaryScreen');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              //backgroundColor: 'red',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/images/Dictionary.png')}
              resizeMode="contain"
              style={{aspectRatio: 1, width: 80, marginLeft: 10}}
            />
            <Text
              style={[
                styles.title,
                {color: 'darkgreen', paddingLeft: 5, marginLeft: 10},
              ]}>
              TỪ ĐIỂN
            </Text>
          </View>
        </AwesomeButton>
        <AwesomeButton
          height={100}
          borderRadius={10}
          width={null}
          stretch
          backgroundColor="white"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.push('NewsCategoryScreen');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              //backgroundColor: 'red',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/images/News.png')}
              resizeMode="contain"
              style={{aspectRatio: 1, width: 80, marginLeft: 10}}
            />
            <Text
              style={[
                styles.title,
                {color: 'darkgreen', paddingLeft: 5, marginLeft: 10},
              ]}>
              ĐỌC TIN TỨC
            </Text>
          </View>
        </AwesomeButton>
      </View>
    </View>
  );
};

export default MoreFeatureScreen;
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: 'Nunito-Black',
  },
});
