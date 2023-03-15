import {StyleSheet, Text, View, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button-fixed';

const {width, height} = Dimensions.get('window');

const WordCorrectModal = props => {
  if (props.wordCorrectModalVisible == true)
    return (
      <View
        activeOpacity={1}
        style={{
          position: 'absolute',
          bottom: 0,
          height: (height - 50) * 0.5,
          width: '100%',
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          zIndex: 100,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#baff8c',
            justifyContent: 'center',
            paddingVertical: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'lightgreen',
            width: '100%',
          }}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <LottieView
              autoPlay
              style={{width: 100}}
              source={require('../../assets/lottie/party-parrot.json')}
            />
            <View style={{width: '43%', justifyContent: 'center'}}>
              <Text style={styles.heading1}>Chính xác!</Text>
              <Text style={styles.heading2}>Từ đúng là '{props.word}'</Text>
              <Text style={styles.subtitle}>
                Bạn hãy xem lại từ hoặc chuyển qua từ mới nhé!
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>
              <AwesomeButton
                springRelease
                activeOpacity={0.8}
                height={props.wordId != props.length ? 50 : 60}
                width={null}
                stretch
                onPress={props.navigateForward}
                backgroundDarker={'darkgreen'}
                borderColor={'darkgreen'}
                borderWidth={1}
                backgroundColor={'green'}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Nunito-Black',
                    fontSize: 17,
                    textAlign: 'center',
                  }}>
                  {props.wordId != props.length ? 'TIẾP TỤC' : 'HOÀN THÀNH'}
                </Text>
              </AwesomeButton>
            </View>
          </View>
        </View>
      </View>
    );
  else return <View></View>;
};

export default WordCorrectModal;

const styles = StyleSheet.create({
  heading1: {fontFamily: 'Nunito-Black', fontSize: 20, color: 'green'},
  heading2: {fontFamily: 'Nunito-Black', fontSize: 16, color: 'green'},
  subtitle: {fontFamily: 'Nunito-Medium'},
});
