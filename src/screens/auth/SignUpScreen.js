import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Pressable,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  ToastAndroid,
  StatusBar
} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {containers, images, texts, buttons, colors} from '../../styles';

import {AuthContext} from '../navigation/AuthContext';
import auth from '@react-native-firebase/auth';
import Auth from '../../services/authService';

const SignUpScreen = ({navigation}) => {
  const [contPass, setContPass] = useState('');
  const [contRePass, setContRePass] = useState('');
  const [contUser, setContUser] = useState('');
  const [contEmail, setContEmail] = useState('');
  const [show, setShow] = useState(false);

  const onSignInButtonPressed = next => {
    //  const {register} = useContext(AuthContext);
    setTimeout(() => {
      if (contPass != contRePass) {
        ToastAndroid.show(
          'Xác nhận mật khẩu không giống với mật khẩu.',
          ToastAndroid.SHORT,
        );
      } else Auth.register(contEmail, contPass, contUser);
      next();
    }, 1000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);

  const {width, height} = useWindowDimensions();
  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <View style={containers.root}>
        {/*ILLUSTRATION*/}

        <Image
          source={require('../../assets/images/Title.png')}
          style={[images.title, {height: height * 0.2}]}
        />

        {/*SCREEN TITLE*/}

        <View height={60}>
          <Text
            style={[
              texts.outside,
              {width: null, fontSize: 25, color: 'darkgreen'},
            ]}>
            ĐĂNG KÝ
          </Text>
        </View>

        {/*FULLNAME*/}

        <FloatingLabelInput
          label={'Họ và Tên'}
          style={{flex: 1}}
          value={contUser}
          borderColor={'darkgreen'}
          onChangeText={value => setContUser(value)}
        />

        <View height={10} />

        {/*EMAIL*/}

        <FloatingLabelInput
          label={'Email đăng nhập'}
          style={{flex: 1}}
          value={contEmail}
          borderColor={'darkgreen'}
          onChangeText={value => setContEmail(value)}
        />

        <View height={10} />

        {/*PASSWORD*/}

        <FloatingLabelInput
          label={'Mật khẩu'}
          isPassword
          style={{flex: 1}}
          value={contPass}
          onChangeText={value => setContPass(value)}
          borderColor={'darkgreen'}
          customShowPasswordComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="eye" size={20} color="green" />
              <View width={2} />
              <Text style={texts.showHide}>Show</Text>
            </View>
          }
          customHidePasswordComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="eye-off" size={20} color="red" />
              <View width={2} />
              <Text style={texts.showHide}>Hide</Text>
            </View>
          }
        />

        <View height={15} />

        <FloatingLabelInput
          label={'Nhập lại mật khẩu'}
          isPassword
          style={{flex: 1}}
          value={contRePass}
          onChangeText={value => setContRePass(value)}
          borderColor={'darkgreen'}
          customShowPasswordComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="eye" size={20} color="green" />
              <View width={2} />
              <Text style={texts.showHide}>Show</Text>
            </View>
          }
          customHidePasswordComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="eye-off" size={20} color="red" />
              <View width={2} />
              <Text style={texts.showHide}>Hide</Text>
            </View>
          }
        />
        <View height={40} />

        {/*DN BUTTON*/}
        <View style={{height: 10}} flexDirection="row">
          <AwesomeButton
            borderRadius={30}
            springRelease
            progress
            activeOpacity={0.8}
            onPress={onSignInButtonPressed}
            backgroundDarker={'darkgreen'}
            backgroundColor={'green'}>
            <Text style={buttons.wide}>ĐĂNG KÝ</Text>
          </AwesomeButton>
        </View>

        <View height={40} />

        {/*HOẶC SEPERATOR*/}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
          <View>
            <Text width={50} style={[texts.outside, {width: 50, fontSize: 13}]}>
              HOẶC
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
        </View>

        <View height={10} />

        {/*SOCIAL ROW*/}

        <View style={{flexDirection: 'row'}}>
          {/*GOOGLE BUTTON*/}

          <AwesomeButton
            borderRadius={30}
            springRelease
            activeOpacity={0.8}
            onPress={() => Auth.googleSignIn()}
            backgroundColor={colors.white}
            borderColor={'green'}
            borderWidth={1}
            backgroundDarker={'darkgreen'}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}>
              <FontAwesome name="google" size={25} color="darkred" />
              <View width={10} />
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Nunito-Black',
                  fontSize: 15,
                  color: 'darkgreen',
                }}>
                GOOGLE
              </Text>
            </View>
          </AwesomeButton>

          <View style={{width: 15}} />

          {/*FACEBOOK BUTTON*/}

          <AwesomeButton
            borderRadius={30}
            springRelease
            activeOpacity={0.8}
            onPress={() => Auth.facebookSignIn()}
            backgroundDarker={'darkgreen'}
            borderColor={'green'}
            borderWidth={1}
            backgroundColor={colors.white}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <FontAwesome name="facebook-f" size={25} color="darkblue" />
              <View width={10} />
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Nunito-Black',
                  fontSize: 15,
                  color: 'darkgreen',
                }}>
                FACEBOOK
              </Text>
            </View>
          </AwesomeButton>
        </View>

        <View height={20} />

        {/*CHUA TK SEPERATOR*/}

        <Text style={[texts.outside, {fontSize: 13}]}>ĐÃ CÓ TÀI KHOẢN?</Text>

        <View height={40} />

        {/*DK BUTTON*/}

        <View height={10} flexDirection={'row'}>
          <AwesomeButton
            borderRadius={30}
            springRelease
            activeOpacity={0.8}
            onPress={() => navigation.replace('SignInScreen')}
            backgroundDarker={'darkgreen'}
            borderColor={'green'}
            borderWidth={1}
            backgroundColor={colors.white}>
            <Text style={[buttons.wide, {color: 'darkgreen'}]}>
              ĐĂNG NHẬP NGAY!
            </Text>
          </AwesomeButton>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignUpScreen;
