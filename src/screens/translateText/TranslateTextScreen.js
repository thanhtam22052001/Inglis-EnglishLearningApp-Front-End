import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-element-textinput';
import Clipboard from '@react-native-clipboard/clipboard';
//import Translator, {TranslatorProvider} from 'react-native-translator';
import translate from 'google-translate-api-x';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {speech_word} from '../../services/voice';

const TranslateTextScreen = () => {
  const [loading, setLoading] = useState(false);
  const [contWordEnglish, setContWordEnglish] = useState('');
  const [contValueToTranslate, setContValueToTranslate] = useState({
    text: '',
    from: 'en',
    to: 'vi',
  });
  const [contWordVietnamese, setContWordVietnamese] = useState('');
  useEffect(() => {
    const translateData = async () => {
      if (contValueToTranslate.text) {
        setLoading(true);
        const result = await translate(contValueToTranslate.text, {
          from: contValueToTranslate.from,
          to: contValueToTranslate.to,
        })
          .then(res => {
            if (contValueToTranslate.to === 'en') setContWordEnglish(res.text);
            else setContWordVietnamese(res.text);
          })
          .catch(err => {
            console.error(err);
          });
        setLoading(false);
      }
    };
    translateData().catch(console.error);
  }, [contValueToTranslate]);
  return (
    <View style={{backgroundColor: 'white', flex: 1, padding: 20}}>
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            elevation: 20,
            zIndex: 100,
            top: 0,
            right: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(contWordEnglish);
              ToastAndroid.showWithGravity(
                'Đã copy vào bàn phím của bạn!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}
            style={{
              backgroundColor: 'darkgreen',
              aspectRatio: 1,
              height: 50,
              borderRadius: 10,
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            <Image
              source={require('../../assets/images/Copy.png')}
              resizeMode="contain"
              style={{height: '100%', aspectRatio: 1}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            elevation: 20,
            zIndex: 101,
            top: 50,
            right: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              speech_word(contWordEnglish);
            }}
            style={{
              backgroundColor: 'darkgreen',
              aspectRatio: 1,
              height: 50,
              borderRadius: 10,
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo
              name="sound"
              style={{
                fontSize: 40,
                color: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          value={contWordEnglish}
          style={styles.neutralInput}
          inputStyle={[styles.inputStyle, {zIndex: 0}]}
          labelStyle={styles.neutralLabelStyle}
          placeholderStyle={styles.neutralPlaceholderStyle}
          label="English"
          //multiline={true}
          multiline={true}
          blurOnSubmit={true}
          placeholder="eg. Hello"
          placeholderTextColor="gray"
          onChangeText={setContWordEnglish}
          onEndEditing={event => {
            setContValueToTranslate({
              text: event.nativeEvent.text,
              from: 'en',
              to: 'vi',
            });
          }}
          onFocus={event => {
            setContWordVietnamese('');
          }}
        />
      </View>
      <View height={10} />
      {loading && (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontFamily: 'Nunito-Light'}}>Loading ... </Text>
          <ActivityIndicator />
        </View>
      )}
      <View height={10} />
      <View>
        <View
          style={{
            position: 'absolute',
            elevation: 20,
            zIndex: 102,
            top: 0,
            right: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(contWordVietnamese);
              ToastAndroid.showWithGravity(
                'Đã copy vào bàn phím của bạn!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}
            style={{
              backgroundColor: 'darkgreen',
              aspectRatio: 1,
              height: 50,
              borderRadius: 10,
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            <Image
              source={require('../../assets/images/Copy.png')}
              resizeMode="contain"
              style={{height: '100%', aspectRatio: 1}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            elevation: 20,
            zIndex: 103,
            top: 50,
            right: 0,
          }}></View>
      </View>
      <TextInput
        value={contWordVietnamese}
        style={styles.neutralInput}
        inputStyle={[styles.inputStyle, {zIndex: 1}]}
        labelStyle={styles.neutralLabelStyle}
        placeholderStyle={styles.neutralPlaceholderStyle}
        //multiline={true}
        multiline={true}
        blurOnSubmit={true}
        label="Vietnamese"
        placeholder="eg. Xin chào"
        placeholderTextColor="gray"
        onChangeText={setContWordVietnamese}
        onEndEditing={event => {
          setContValueToTranslate({
            text: event.nativeEvent.text,
            from: 'vi',
            to: 'en',
          });
        }}
        onFocus={event => {
          setContWordEnglish('');
        }}
      />
    </View>
  );
};

export default TranslateTextScreen;

const styles = StyleSheet.create({
  neutralInput: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'darkgreen',
    borderTopColor: 'darkgreen',
    flex: 1,
  },
  inputStyle: {
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: 'Nunito-ExtraBold',
    color: 'darkgreen',
    textAlignVertical: 'top',
    paddingTop: 25,
    paddingRight: 35,
  },
  neutralLabelStyle: {
    fontSize: 25,
    position: 'absolute',
    top: -12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    borderRadius: 10,
    fontFamily: 'Nunito-Black',
    color: 'darkgreen',
    elevation: 2,
  },
  neutralPlaceholderStyle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
    color: 'darkgreen',
  },
});
