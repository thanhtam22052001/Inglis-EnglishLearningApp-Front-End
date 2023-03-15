import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';

const OCRBeginScreen = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        //alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <LottieView
          autoPlay
          loop
          source={require('../../assets/lottie/QRScan.json')}
          style={{width: '100%', alignSelf: 'center'}}
        />
        <Text style={{fontSize: 30, fontFamily: 'Nunito-Black'}}>SCAN</Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Nunito-Medium',
            paddingHorizontal: 30,
          }}>
          Bạn hãy chuẩn bị sẵn sàng camera nhé!
        </Text>
      </View>
      <View style={{height: 110}} />
      <View
        style={{
          height: '20%',
          paddingHorizontal: 20,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <AwesomeButton
          height={60}
          borderRadius={20}
          width={null}
          stretch
          backgroundColor="green"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.push('OCRScreen');
          }}>
          <Text
            style={{fontSize: 20, fontFamily: 'Nunito-Black', color: 'white'}}>
            TIẾP TỤC
          </Text>
        </AwesomeButton>
        <AwesomeButton
          //height={50}
          borderRadius={20}
          width={null}
          stretch
          backgroundColor="white"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.goBack();
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Nunito-Black',
              color: 'darkgreen',
            }}>
            QUAY VỀ
          </Text>
        </AwesomeButton>
      </View>
    </View>
  );
};

export default OCRBeginScreen;
