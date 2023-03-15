import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getAuth} from '@react-native-firebase/auth';
import {getUser_ByID, insert_NewUser} from '../network/server';
import {ToastAndroid} from 'react-native';

//const userauth = getAuth();

const register = (email, password, name) => {
  if (email != '' && password != '' && name != '') {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        ToastAndroid.show(
          'User account created & signed in!',
          ToastAndroid.SHORT,
        );
        //console.log(auth().currentUser.uid);
        insert_NewUser(auth().currentUser.uid, name, email);
        return true;
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.SHORT,
          );
        }

        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.SHORT,
          );
        }

        console.error(error);
        return false;
      });
  } else ToastAndroid.show('Hãy nhập đầy đủ các trường.', ToastAndroid.SHORT);
};

const login = async (email, password) => {
  if (email != '' && password != '') {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        console.log(auth().currentUser.uid);
        //return true;
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
        //return false;
      });
  } else {
    ToastAndroid.show(
      'Hãy nhập email và password của bạn.',
      ToastAndroid.SHORT,
    );
  }
};

const logout = async () => {
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

const facebookSignIn = async () => {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  await auth()
    .signInWithCredential(facebookCredential)
    .then(() => {
      console.log('current User', auth().currentUser);
      getUser_ByID(auth().currentUser.uid).then(res => {
        if (res[0] == null) {
          //console.log('nullll');
          insert_NewUser(
            auth().currentUser.uid,
            auth().currentUser.displayName,
            auth().currentUser.email,
          );
        }
      });
    });
};

const googleSignIn = async () => {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

const check_User_Exist = () => {
  const user = auth().currentUser;
  //getUser_ByID(user.uid).then(result => console.log(result));
};

const forgotPassword = async email => {
  if (email != '') {
    console.log(email);
    await auth().sendPasswordResetEmail(email);
    ToastAndroid.show(
      'Email đặt lại mật khẩu đã được gửi đến hòm thư của bạn.',
      ToastAndroid.SHORT,
    );
    return true;
  } else {
    ToastAndroid.show('Hãy nhập email của bạn.', ToastAndroid.SHORT);
    return false;
  }
};
const Auth = {
  login,
  register,
  facebookSignIn,
  googleSignIn,
  logout,
  check_User_Exist,
  forgotPassword,
};

export default Auth;
