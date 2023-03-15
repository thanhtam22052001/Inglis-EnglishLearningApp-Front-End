import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import {buttons} from '../../styles';
import ForgotPasswordSuccessModal from '../../components/modals/ForgotPasswordSuccessModal';
import Auth from './../../services/authService';
import auth from '@react-native-firebase/auth';

const {width} = Dimensions.get('window');
const ForgotPasswordScreen = () => {
  const [contEmail, setContEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const duration = 2000;
  useEffect(() => {
    setModalVisible(success);
    setTimeout(() => {
      setModalVisible(false);
    }, duration);
  }, [success]);
  return (
    <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center'}}>
      <ForgotPasswordSuccessModal
        modalVisible={modalVisible}
        duration={duration}
      />
      <Text style={{fontSize: 30, fontFamily: 'Nunito-Black', color: 'green'}}>
        Bạn quên mật khẩu?
      </Text>
      <View
        style={{
          height: '40%',
          width: 300,
        }}>
        <LottieView
          autoPlay
          loop
          source={require('../../assets/lottie/forgot-password.json')}
          style={{
            resizeMode: 'contain',
          }}
        />
      </View>

      <Text
        style={{
          textAlign: 'center',
          maxWidth: '65%',
          fontFamily: 'Nunito-Bold',
        }}>
        Nhập địa chỉ Email đăng nhập để nhận đường dẫn đặt lại mật khẩu bạn nha!
      </Text>
      <View style={{width: '80%', paddingTop: 10}}>
        <FloatingLabelInput
          label={'Email đăng nhập'}
          value={contEmail}
          labelStyles={{color: 'green'}}
          borderColor={'darkgreen'}
          onChangeText={value => setContEmail(value)}
        />
      </View>
      <View style={{paddingTop: 10, width: '80%'}} flexDirection="row">
        <AwesomeButton
          borderRadius={30}
          springRelease
          activeOpacity={0.8}
          width={width * 0.8}
          height={50}
          progress
          onPress={next => {
            setTimeout(() => {
              setSuccess(Auth.forgotPassword(contEmail));

              next();
            }, 1000);
          }}
          backgroundDarker={'darkgreen'}
          backgroundColor={'green'}>
          <Text style={buttons.wide}>GỬI MÃ XÁC NHẬN</Text>
        </AwesomeButton>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
