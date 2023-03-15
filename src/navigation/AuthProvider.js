import React, {createContext, useState, useMemo} from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {AuthContext} from './AuthContext';

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  // const authContext = useMemo(
  //   () => ({
  //     login: async (email, password) => {
  //       await auth()
  //         .signInWithEmailAndPassword(email, password)
  //         .then(() => {
  //           console.log('User account created & signed in!');
  //         })
  //         .catch(error => {
  //           if (error.code === 'auth/email-already-in-use') {
  //             console.log('That email address is already in use!');
  //           }

  //           if (error.code === 'auth/invalid-email') {
  //             console.log('That email address is invalid!');
  //           }

  //           console.error(error);
  //         });
  //     },
  //     register: async (email, password) => {
  //       await auth()
  //         .createUserWithEmailAndPassword(email, password)
  //         .then(() => {
  //           console.log('User account created & signed in!');
  //           return true;
  //         })
  //         .catch(error => {
  //           if (error.code === 'auth/email-already-in-use') {
  //             console.log('That email address is already in use!');
  //           }

  //           if (error.code === 'auth/invalid-email') {
  //             console.log('That email address is invalid!');
  //           }

  //           console.error(error);
  //           return false;
  //         });
  //     },
  //     logout: async () => {
  //       await auth()
  //         .signOut()
  //         .then(() => console.log('User signed out!'));
  //     },
  //   }),
  //   [],
  // );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register: async (email, password) => {
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
              return true;
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
              return false;
            });
        },
        login: async (email, password) => {
          await auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
              return true;
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
              return false;
            });
        },
        logout: async () => {
          await auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        },
        fbLogin: async () => {
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
          return auth().signInWithCredential(facebookCredential);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
