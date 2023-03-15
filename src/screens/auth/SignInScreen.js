import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {containers, images, texts, buttons, colors} from '../../styles';

import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {AuthContext} from '../navigation/AuthContext';
import Auth from '../../services/authService';

const customData = require('./customData.json');

///
function SignInScreen({navigation}) {
  const [contPass, setContPass] = useState('');
  const [contUser, setContUser] = useState('');
  const [show, setShow] = useState(false);
  // {login, fbLogin} = useContext(AuthContext);

  function onSignInButtonPressed(user, pass) {
    const check = Auth.login(user, pass);
    if (check) {
      navigation.replace('DashboardScreen');
    }
  }

  //Facebook
  function onFacebookButtonPress() {
    Auth.facebookSignIn();
    //Auth.check_User_Exist();
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);

  const {width, height} = useWindowDimensions();
  return (
    <View style={containers.root}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

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
          ĐĂNG NHẬP
        </Text>
      </View>
      {/*EMAIL*/}
      <FloatingLabelInput
        label={'Email đăng nhập'}
        style={{flex: 1}}
        value={contUser}
        borderColor={'darkgreen'}
        onChangeText={value => setContUser(value)}
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
      {/*FORGOT PASSWORD*/}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('ForgotPasswordScreen');
          }}>
          <Text
            style={[
              texts.outside,
              {
                color: 'darkgreen',
              },
            ]}>
            QUÊN MẬT KHẨU?
          </Text>
        </TouchableOpacity>
      </View>
      <View height={40} />
      {/*DN BUTTON*/}
      <View style={{height: 10}} flexDirection="row">
        <AwesomeButton
          borderRadius={30}
          springRelease
          activeOpacity={0.8}
          progress
          onPress={next => {
            setTimeout(() => {
              Auth.login(contUser ?? '', contPass ?? '');
              next();
            }, 2500);
          }}
          backgroundDarker={'darkgreen'}
          backgroundColor={'green'}>
          <Text style={buttons.wide}>ĐĂNG NHẬP</Text>
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
                color: '#22612D',
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
          onPress={onFacebookButtonPress}
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
      <Text style={[texts.outside, {fontSize: 13}]}>CHƯA CÓ TÀI KHOẢN?</Text>
      <View height={40} />
      {/*DK BUTTON*/}
      <View height={10} flexDirection={'row'}>
        <AwesomeButton
          borderRadius={30}
          activeOpacity={0.8}
          onPress={() => {
            navigation.replace('SignUpScreen');
          }}
          backgroundDarker={'darkgreen'}
          borderColor={'green'}
          borderWidth={1}
          backgroundColor={colors.white}>
          <Text style={[buttons.wide, {color: 'darkgreen'}]}>
            ĐĂNG KÝ NGAY!
          </Text>
        </AwesomeButton>
      </View>
    </View>
  );
}
export default SignInScreen;
