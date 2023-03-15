import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Keyboard,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-element-textinput';
import React, {useState, useEffect} from 'react';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';
import LottieView from 'lottie-react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {speech_word} from '../../../services/voice';
import {playCorrectAudio, playWrongAudio} from '../../../services/playAudio';
const {width, height} = Dimensions.get('window');
const LessonScreenFlashcard = ({navigation, route}) => {
  useEffect(() => {
    const backAction = () => {
      navigateBackward();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const {
    isPinWord,
    listlesson,
    indexlesson,
    lessonId,
    wordId,
    courseId,
    progress,
    maxNumWords,
    data,
    title,
  } = route.params; // lessonId nay de biet xem dang o lesson may
  const {
    word,
    type,
    definition,
    pronunciation,
    meaning,
    example,
    exampleMeaning,
    wordUri,
  } = data[wordId - 1];
  const [contWord, setContWord] = useState(
    //lastPos != null && lastPos > wordId ? word : '',
    '',
  );
  const [correct, setCorrect] = useState(
    // lastPos != null && lastPos > wordId ? true : null,
    null,
  );
  const checkWord = () => {
    //console.log(indexlesson);
    if (contWord.toLowerCase().trim() == word.trim()) {
      setCorrect(true);
      playCorrectAudio();
      Keyboard.dismiss();
      return true;
    } else {
      setCorrect(false);
      playWrongAudio();
      return false;
    }
  };
  const navigateForward = () => {
    {
      console.log(isPinWord);
      if (wordId > maxNumWords - 1) {
        if (isPinWord === true) {
          return navigation.push('DashboardScreen', {
            //screen: 'PinWordScreen',
          });
        } else {
          return navigation.push('LessonCompleteScreen', {
            listlesson: listlesson,
            indexlesson: indexlesson,
            data: data,
            courseId: courseId,
            lessonId: lessonId,
            lessonName: title, // Phần này get từ api ra, bằng lessonId
            //goBack: goBack,
            title: title,
            type: 'Flashcard',
            onPress: () => {
              navigation.popToTop();
            },
            exitLesson: () => {
              navigation.popToTop();
            },
          });
        }
      } else {
        return navigation.push('LessonScreenFlashcard', {
          isPinWord: isPinWord,
          listlesson: listlesson,
          indexlesson: indexlesson,
          wordId: wordId + 1,
          progress: progress + 1 / (maxNumWords - 1),
          data: data,
          // lastPos: lastPos != null && lastPos < wordId ? wordId + 1 : lastPos,
          lessonId: lessonId,
          maxNumWords: maxNumWords,
          courseId: courseId,
          exitLesson: () => {
            navigation.popToTop();
          },
        });
      }
    }
  };

  const navigateBackward = () => {
    if (wordId < 2) return null;
    else {
      return navigation.push('LessonScreenFlashcard', {
        wordId: wordId - 1,
        //lastPos: lastPos != null && lastPos < wordId ? wordId : lastPos,
        progress: progress - 1 / (maxNumWords - 1),
        data: data,
        lessonId: lessonId,
        maxNumWords: maxNumWords,
        courseId: courseId,
        exitLesson: () => {
          navigation.popToTop();
        },
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        // position: 'absolute',
        // top: -50,
        // //backgroundColor: 'red',
        // left: 0,
        // width: width,
        // height: height,
      }}>
      <ScrollView style={styles.cardContainer}>
        <View style={{width: '90%', alignSelf: 'center', marginTop: 60}}>
          <CubeNavigationHorizontal
            loop
            ref={view => {
              this.cube = view;
            }}>
            {/*FIRST CARD*/}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  borderColor: 'gold',
                },
              ]}>
              {correct && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('PinWordScreen', {
                      isModal: true,
                      wordData: data[wordId - 1],
                    });
                  }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    borderRadius: 10,
                    height: 40,
                    backgroundColor: 'lightblue',
                    justifyContent: 'center',
                  }}>
                  <AntDesign
                    name={'pushpin'}
                    style={{
                      fontSize: 20,
                      paddingHorizontal: 10,
                      color: 'darkblue',
                    }}
                  />
                </TouchableOpacity>
              )}

              <Image style={styles.image} source={{uri: wordUri + ''}} />

              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-Black',
                    fontSize: 20,
                    textAlign: 'left',
                  }}>
                  ({type})
                </Text>
              </View>

              <Text
                style={[
                  styles.text,
                  {fontFamily: 'Nunito-Medium', fontSize: 17},
                ]}>
                {definition}
              </Text>
            </View>
            {/*SECOND CARD*/}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: 'rgba(30, 144, 255,0.1)',
                  borderColor: 'dodgerblue',
                },
              ]}>
              <Image style={styles.image} source={{uri: wordUri + ''}} />

              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  alignItems: 'center',
                }}>
                <AwesomeButton
                  springRelease
                  activeOpacity={0.8}
                  height={35}
                  width={35}
                  onPress={() => speech_word(word)}
                  backgroundDarker={'darkgreen'}
                  borderColor={'darkgreen'}
                  borderWidth={1}
                  backgroundColor={'green'}>
                  <Entypo name="sound" style={{fontSize: 20, color: 'white'}} />
                </AwesomeButton>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.text,
                    {fontFamily: 'Nunito-Bold', fontSize: 17},
                  ]}>
                  {pronunciation}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: 'Nunito-Black',
                      fontSize: 20,
                      textAlign: 'left',
                      paddingRight: 5,
                    },
                  ]}>
                  ({type})
                </Text>
                <Text
                  style={[
                    styles.text,
                    {fontFamily: 'Nunito-Medium', fontSize: 17},
                  ]}>
                  {meaning}
                </Text>
              </View>
            </View>
            {/*THIRD CARD*/}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: 'rgba(0, 128, 0, 0.1)',
                  borderColor: 'green',
                },
              ]}>
              <Image style={styles.image} source={{uri: wordUri + ''}} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '90%',
                  paddingBottom: 10,
                }}>
                <AwesomeButton
                  springRelease
                  activeOpacity={0.8}
                  height={35}
                  width={35}
                  onPress={() => speech_word(example)}
                  backgroundDarker={'darkgreen'}
                  borderColor={'darkgreen'}
                  borderWidth={1}
                  backgroundColor={'green'}>
                  <Entypo name="sound" style={{fontSize: 20, color: 'white'}} />
                </AwesomeButton>
                <Text
                  style={{
                    fontFamily: 'Nunito-Black',
                    fontSize: 20,
                    width: '80%',
                    textAlign: 'left',
                  }}>
                  {example}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 0.9,
                  borderStyle: 'dashed',
                  width: '80%',
                }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: 'Nunito-Medium',
                    fontSize: 17,
                    width: '90%',
                  },
                ]}>
                {exampleMeaning}
              </Text>
            </View>
          </CubeNavigationHorizontal>
        </View>

        <View style={styles.middleComponents}>
          <TextInput
            value={contWord}
            style={
              correct == null
                ? styles.neutralInput
                : correct == false
                ? styles.incorrectInput
                : styles.correctInput
            }
            inputStyle={styles.inputStyle}
            labelStyle={
              correct == null
                ? styles.neutralLabelStyle
                : correct == false
                ? styles.incorrectLabelStyle
                : styles.correctLabelStyle
            }
            placeholderStyle={
              correct == null
                ? styles.neutralPlaceholderStyle
                : correct == false
                ? styles.incorrectPlaceholderStyle
                : styles.correctPlaceholderStyle
            }
            textErrorStyle={styles.textErrorStyle}
            label="Gõ từ mà bạn đoán được"
            placeholder="eg. Hello"
            placeholderTextColor="gray"
            onChangeText={text => {
              setContWord(text);
            }}
          />
          <View width={'5%'} />
          <AwesomeButton
            springRelease
            activeOpacity={0.8}
            height={50}
            width={null}
            stretch
            onPress={checkWord}
            backgroundDarker={
              correct == null
                ? 'dodgerblue'
                : correct == true
                ? 'darkgreen'
                : 'red'
            }
            borderColor={
              correct == null
                ? 'dodgerblue'
                : correct == true
                ? 'darkgreen'
                : 'red'
            }
            borderWidth={1}
            backgroundColor={'white'}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                correct != null
                  ? {
                      paddingRight: 20,
                    }
                  : {},
              ]}>
              <View style={correct != null ? {height: 45, width: 55} : {}}>
                {correct == null ? (
                  <View></View>
                ) : correct == false ? (
                  <LottieView
                    source={require('../../../assets/lottie/wrong.json')}
                    autoPlay
                    loop={false}
                    style={{height: '100%'}}
                  />
                ) : (
                  <LottieView
                    source={require('../../../assets/lottie/correct.json')}
                    autoPlay
                    loop={false}
                    style={{height: '100%'}}
                  />
                )}
              </View>
              <Text
                style={
                  correct == null
                    ? {
                        color: 'dodgerblue',
                        fontFamily: 'Nunito-Black',
                        fontSize: 20,
                      }
                    : correct == true
                    ? {
                        color: 'green',
                        fontFamily: 'Nunito-Black',
                        fontSize: 20,
                      }
                    : {
                        color: 'red',
                        fontFamily: 'Nunito-Black',
                        fontSize: 20,
                      }
                }>
                CHECK
              </Text>
            </View>
          </AwesomeButton>
        </View>
      </ScrollView>
      <View style={styles.lowerComponents}>
        <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
          <AwesomeButton
            springRelease
            activeOpacity={0.8}
            height={50}
            width={null}
            stretch
            onPress={navigateBackward}
            backgroundDarker={'darkgreen'}
            borderColor={'darkgreen'}
            borderWidth={1}
            backgroundColor={'white'}>
            <Text
              style={{
                color: 'green',
                fontFamily: 'Nunito-Black',
                fontSize: 17,
              }}>
              QUAY LẠI
            </Text>
          </AwesomeButton>
          <View width={'20%'} />
          <AwesomeButton
            springRelease
            activeOpacity={0.8}
            height={50}
            width={null}
            stretch
            onPress={navigateForward}
            backgroundDarker={'darkgreen'}
            borderColor={'darkgreen'}
            borderWidth={1}
            backgroundColor={'green'}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Nunito-Black',
                fontSize: 17,
              }}>
              {wordId != data.length ? 'TIẾP TỤC' : 'HOÀN THÀNH'}
            </Text>
          </AwesomeButton>
        </View>
      </View>
    </View>
  );
};

export default LessonScreenFlashcard;

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    width: '100%',
    //marginLeft: parseInt(width * 0.1),
    height: 'auto',
  },
  card: {
    borderRadius: 10,
    borderBottomWidth: 7,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerComponents: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  middleComponents: {
    paddingTop: height * 0.5,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingBottom: 50,
  },
  image: {
    height: '30%',
    width: '30%',
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    paddingTop: 10,
  },
  neutralInput: {
    height: 55,
    width: '60%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'dodgerblue',
    borderTopColor: 'dodgerblue',
  },
  correctInput: {
    height: 55,
    width: '60%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'green',
    borderTopColor: 'green',
  },
  incorrectInput: {
    height: 55,
    width: '60%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'red',
    borderTopColor: 'red',
  },
  inputStyle: {fontSize: 16, paddingLeft: 10},
  incorrectLabelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    borderRadius: 10,
    fontFamily: 'Nunito-Black',
    color: 'red',
    elevation: 2,
  },
  correctLabelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    borderRadius: 10,
    fontFamily: 'Nunito-Black',
    color: 'green',
    elevation: 2,
  },
  neutralLabelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    borderRadius: 10,
    fontFamily: 'Nunito-Black',
    color: 'dodgerblue',
    elevation: 2,
  },
  neutralPlaceholderStyle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
    color: 'dodgerblue',
  },
  incorrectPlaceholderStyle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
    color: 'red',
  },
  correctPlaceholderStyle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
    color: 'green',
  },
  textErrorStyle: {fontSize: 16},
});
