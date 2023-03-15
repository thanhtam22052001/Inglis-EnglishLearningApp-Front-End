import {View, Text, Image, ActivityIndicator, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import RNTextDetector from 'rn-text-detector';
import LottieView from 'lottie-react-native';
import _ from 'lodash';
import translate from 'google-translate-api-x';

const OCRScreen = () => {
  const [text, setText] = useState([]);
  const [textTranslated, setTextTranslate] = useState('');
  const [loadTranslated, setLoadTranslated] = useState(false);
  const [state, setState] = useState({
    loading: false,
    image: null,
    textRecognition: null,
  });
  useEffect(() => {
    setLoadTranslated(true);
    const translateData = async () => {
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      // waits for 1000ms
      await sleep(1000);
      if (text.length !== 0) {
        const result = await translate(`${text.join('\n')}`, {
          from: 'en',
          to: 'vi',
        })
          .then(res => {
            setTextTranslate(res.text);
          })
          .catch(err => {
            console.error(err);
          });
        setLoadTranslated(false);
      }
    };
    translateData().catch(console.error);
  }, [text]);
  const onPress = type => {
    setState({...state, loading: true});
    type === 'capture'
      ? launchCamera({mediaType: 'image'}, onImageSelect)
      : launchImageLibrary({mediaType: 'image'}, onImageSelect);
  };
  const onImageSelect = async media => {
    if (!media) {
      setState({...state, loading: false});
      return;
    }
    if (!!media && media.assets) {
      const file = media.assets[0].uri;
      const textRecognition = await RNTextDetector.detectFromUri(file);
      setState({
        ...state,
        textRecognition,
        image: file,
        loading: false,
      });
    }
  };
  const renderText = rawTexts => {
    let textArray = [];
    let textComponents = rawTexts.map((item, i) => {
      textArray.push(item.text);
      return (
        <Text key={i} style={{fontSize: 20, fontFamily: 'Nunito-Medium'}}>
          {item.text}
        </Text>
      );
    });
    if (!_.isEqual(textArray, text)) {
      setText(textArray);
    }
    return textComponents;
  };
  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          //backgroundColor: 'red',
        }}>
        <AwesomeButton
          borderRadius={20}
          width={null}
          stretch
          backgroundColor="white"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => onPress('capture')}>
          <Image
            style={{height: '100%', width: 50}}
            source={require('../../assets/images/Camera.png')}
            resizeMode="contain"
          />
          <View style={{width: 10}} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Nunito-Black',
              color: 'darkgreen',
            }}>
            CHỤP HÌNH
          </Text>
        </AwesomeButton>
        <View height={10} />
        <AwesomeButton
          borderRadius={20}
          width={null}
          stretch
          backgroundColor="white"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => onPress('library')}>
          <Image
            style={{height: '100%', width: 50}}
            source={require('../../assets/images/Gallery.png')}
            resizeMode="contain"
          />
          <View style={{width: 10}} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Nunito-Black',
              color: 'darkgreen',
            }}>
            CHỌN HÌNH
          </Text>
        </AwesomeButton>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          // backgroundColor: 'red',
        }}>
        <ActivityIndicator animating={state.loading} />
        {!state.textRecognition && (
          <LottieView
            autoPlay
            loop
            resizeMode="contain"
            source={require('../../assets/lottie/takingPhotos.json')}
          />
        )}
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              borderRadius: 10,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 5,
              borderColor: state.image ? 'darkgreen' : 'white',
            }}>
            <Image
              style={{
                resizeMode: 'contain',
                width: '100%',
                aspectRatio: 1,
                borderRadius: 10,
              }}
              source={{uri: state.image}}
            />
          </View>
        </View>
        {!!state.textRecognition && (
          <View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Nunito-Black',
                  color: 'darkgreen',
                  paddingVertical: 5,
                }}>
                Text on picture
              </Text>
              {renderText(state.textRecognition)}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Nunito-Black',
                  color: 'darkgreen',
                  paddingVertical: 5,
                }}>
                Text translated
              </Text>
              {loadTranslated ? (
                <ActivityIndicator />
              ) : (
                <Text style={{fontSize: 20, fontFamily: 'Nunito-Medium'}}>
                  {textTranslated}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OCRScreen;
