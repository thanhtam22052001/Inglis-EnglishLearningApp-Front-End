import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {timeFormat} from '../../services/timeService';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import {getRank, calculateRank} from '../../services/rankService';
import {updateRank} from '../../network/server';
import auth from '@react-native-firebase/auth';
const ExamCompleteScreen = ({navigation, route}) => {
  const {timeLeft, totalCorrect, maxNumWords} = route.params;
  const percentage = (totalCorrect / maxNumWords) * 100;
  useEffect(() => {
    updateRank(auth().currentUser.uid, calculateRank(percentage));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.container, {flexGrow: 1}]}>
        <LottieView
          source={require('../../assets/lottie/excellent.json')}
          autoPlay
          loop={false}
          style={{width: '90%', alignSelf: 'center'}}
        />
        <Text
          style={{
            fontFamily: 'Nunito-Black',
            alignSelf: 'center',
            paddingBottom: 10,
            fontSize: 15,
          }}>
          Chúc mừng bạn vừa hoàn thành phần học
        </Text>
        {/* <Text
          style={{
            fontFamily: 'Nunito-Black',
            alignSelf: 'center',
            fontSize: 30,
            color: 'green',
            paddingTop: 15,
          }}>
          {type}
        </Text> */}
        <Text style={styles.body}>
          Bạn đã làm đúng {totalCorrect} / {maxNumWords} câu ({percentage}%).
        </Text>
        <Text style={styles.body}>
          Thời gian còn lại là {timeFormat(timeLeft)}.
        </Text>
        <Text style={styles.body}>
          Trình độ của bạn là {calculateRank(percentage)}.
        </Text>
        <Image
          source={getRank(calculateRank(percentage))}
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
        <View style={styles.footer}>
          <AwesomeButton
            springRelease
            activeOpacity={0.8}
            height={50}
            borderRadius={20}
            width={null}
            stretch
            backgroundDarker={'darkgreen'}
            borderColor={'darkgreen'}
            //Chỉnh cho qua bài kế tiếp
            onPress={() => {
              // cập nhật rank cho user
              navigation.replace('DashboardScreen');
            }}
            borderWidth={1}
            backgroundColor={'green'}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Nunito-Black',
                fontSize: 17,
              }}>
              TIẾP TỤC
            </Text>
          </AwesomeButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExamCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    height: 75,
    flexDirection: 'row',
    width: '90%',
  },
  body: {
    fontFamily: 'Nunito-Medium',
    alignSelf: 'center',
    color: 'black',
    width: '75%',
    paddingTop: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
