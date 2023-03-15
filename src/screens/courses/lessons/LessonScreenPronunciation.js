import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import {TextInput} from 'react-native-element-textinput';
import React, {useState, useRef, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {speech_word} from '../../../services/voice';
import {playCorrectAudio, playWrongAudio} from '../../../services/playAudio';
import Voice from '@react-native-community/voice';

const {width, height} = Dimensions.get('window');
const LessonScreenPronuciation = ({navigation, route}) => {
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
    listlesson,
    indexlesson,
    lessonId,
    wordId,
    courseId,
    progress,
    maxNumWords,
    data,
    title,
  } = route.params;
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
  const [suggestion, setSuggestion] = useState(0);
  const [correct, setCorrect] = useState(
    // lastPos != null && lastPos > wordId ? true : null,
    null,
  );
  const [contWord, setContWord] = useState(
    //lastPos != null && lastPos > wordId ? word : '',
    '',
  );
  const neutralEmoji = require('../../../assets/lottie/emoji/emoji-neutral.json');
  const correctEmoji = [
    require('../../../assets/lottie/emoji/emoji-correct-happy.json'),
    require('../../../assets/lottie/emoji/emoji-correct-love.json'),
  ];
  const incorrectEmoji = [
    require('../../../assets/lottie/emoji/emoji-incorrect-sad.json'),
    require('../../../assets/lottie/emoji/emoji-incorrect-shaking.json'),
  ];
  const navigateForward = () => {
    {
      if (wordId > maxNumWords - 1)
        return navigation.push('LessonCompleteScreen', {
          listlesson: listlesson,
          indexlesson: indexlesson,
          data: data,
          courseId: courseId,
          lessonId: lessonId,
          lessonName: title, // Phần này get từ api ra, bằng lessonId
          //goBack: goBack,
          type: 'Suy đoán',
          onPress: () => {
            navigation.popToTop();
          },
          exitLesson: () => {
            navigation.popToTop();
          },
        });
      else {
        return navigation.push('LessonScreenPronuciation', {
          listlesson: listlesson,
          indexlesson: indexlesson,
          wordId: wordId + 1,
          progress: progress + 1 / (maxNumWords - 1),
          data: data,
          lessonId: lessonId,
          maxNumWords: maxNumWords,
          courseId: courseId,
          //lastPos: lastPos != null && lastPos < wordId ? wordId + 1 : lastPos,
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
      return navigation.push('LessonScreenPronuciation', {
        wordId: wordId - 1,
        //lastPos: lastPos != null && lastPos < wordId ? wordId : lastPos,
        progress: progress - 1 / (maxNumWords - 1),
        data: data,
        lessonId: lessonId,
        maxNumWords: maxNumWords,
        //lastPos: lastPos != null && lastPos < wordId ? wordId : lastPos,
        courseId: courseId,
        exitLesson: () => {
          navigation.popToTop();
        },
      });
    }
  };
  const getEmoji = isCorrect => {
    switch (isCorrect) {
      case null:
        return neutralEmoji;
      case true:
        return correctEmoji[(Math.random() * 2) | 0];
      case false:
        return incorrectEmoji[(Math.random() * 2) | 0];
    }
  };
  const getSuggestion = () => {
    switch (suggestion) {
      case 0:
        return (
          <View>
            <Text style={styles.type}>({type})</Text>
            <Text style={styles.question}>{definition}</Text>
          </View>
        );
      case 1:
        return (
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 80,
                aspectRatio: 1,
                backgroundColor: 'white',
                borderRadius: 10,
                marginRight: 10,
              }}>
              <Image
                //resizeMode="cover"
                source={
                  correct == true
                    ? {uri: wordUri + ''}
                    : require('../../../assets/images/question.png')
                }
                style={{height: '100%', aspectRatio: 1}}
              />
            </View>
            <View style={{maxWidth: '65%'}}>
              <View
                style={{
                  flexDirection: 'row',
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
                  backgroundColor={'white'}>
                  <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
                </AwesomeButton>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.type}>{pronunciation}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.type}>({type})</Text>
                <Text
                  style={[styles.question, {paddingLeft: 2, maxWidth: '80%'}]}>
                  {meaning}
                </Text>
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <AwesomeButton
                  springRelease
                  activeOpacity={0.8}
                  height={35}
                  width={35}
                  onPress={() => speech_word(example)}
                  backgroundDarker={'darkgreen'}
                  borderColor={'darkgreen'}
                  borderWidth={1}
                  backgroundColor={'white'}>
                  <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
                </AwesomeButton>
              </View>

              <Text style={styles.question}>{example}</Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <View>
              <View style={{flexDirection: 'row'}}>
                {/* <AwesomeButton
                  springRelease
                  activeOpacity={0.8}
                  height={35}
                  width={35}
                  //onPress={() => speech_word(word)}
                  backgroundDarker={'darkgreen'}
                  borderColor={'darkgreen'}
                  borderWidth={1}
                  backgroundColor={'white'}>
                   <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
                </AwesomeButton> */}
              </View>

              <Text style={styles.question}>{exampleMeaning}</Text>
            </View>
          </View>
        );
      default:
        return <Text>error</Text>;
    }
  };
  const getBackgroundColor =
    correct != false ? {backgroundColor: 'green'} : {backgroundColor: 'red'};
  const changeSuggestion = () =>
    setSuggestion(
      (correct != true ? suggestion == 1 : suggestion == 3)
        ? 0
        : suggestion + 1,
    );
  const checkWord = () => {
    if (contWord.toLowerCase().trim() == word.trim()) {
      setCorrect(true);
      playCorrectAudio();
      return true;
    } else {
      setCorrect(false);
      playWrongAudio();
      return false;
    }
  };
  const [start, setStart] = useState(false);
  //const [result, setResult] = useState("");
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const animation = useRef(null);
  useEffect(() => {
    if (start === false) {
      animation.current.play(0, 0);
    } else if (start === true) {
      animation.current.play(0, 60);
    }
  }, [start]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    // return () => {
    //   Voice.destroy().then(Voice.removeAllListeners);
    // };

    // Voice.onSpeechStart = onSpeechStart;
    // Voice.onSpeechEnd = onSpeechEnd;
    // Voice.onSpeechError = onSpeechError;
    // Voice.onSpeechResults = onSpeechResults;
    // Voice.onSpeechPartialResults = onSpeechPartialResults;
    // Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
  }, []);

  const speaking = () => {
    if (start === false) {
      setStart(true);
      // LISTEN TO VOICE
      startRecording();
      //startSpeechRecognizing();
      //console.log(' start ne' + started);
    } else if (start === true) {
      setStart(false);
      // STOP LISTENING TO VOICE
      stopRecording();
      //stopSpeechRecognizing();
    }
  };

  const onSpeechStartHandler = e => {
    //setStarted(true);
    // console.log('start ...', e);
    console.log(' start alo' + start);
  };
  const onSpeechEndHandler = e => {
    //setStarted(false);
    console.log('End ...', e);
  };
  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setContWord(text);
    console.log('Result ...', e);
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('error raise start', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.Stop();
      //setStarted(false);
    } catch (error) {
      console.log('error raise stop', error);
    }
  };

  // const onSpeechStart = e => {
  //   setStarted(true);
  //   console.log(' start alo' + started);
  // };
  // const onSpeechEnd = () => {
  //   setStarted(false);
  //   setEnd('True');
  // };
  // const onSpeechError = e => {
  //   setError(JSON.stringify(e.error));
  // };
  // const onSpeechResults = e => {
  //   // console.log(e.value[0]);
  //   setContWord(e.value);
  // };
  // const onSpeechPartialResults = e => {
  //   setPartialResults(e.value);
  // };
  // const onSpeechVolumeChanged = e => {
  //   setPitch(e.value);
  // };
  // const startSpeechRecognizing = async () => {
  //   setPitch('');
  //   setError('');
  //   //setStarted(true);
  //   setContWord([]);
  //   setPartialResults([]);
  //   setEnd('');
  //   try {
  //     await Voice.start('en-US', {
  //       EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000,
  //     });
  //     console.log(contWord + ' start record alo' + started);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // const stopSpeechRecognizing = async () => {
  //   try {
  //     await Voice.stop();
  //     //setStarted(false);
  //     console.log(' stop record alo');
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={[styles.container, {backgroundColor: 'white'}]}
        contentContainerStyle={{alignItems: 'center', flexGrow: 1}}>
        <View
          style={[
            styles.container,
            {
              marginTop: 50,
              alignItems: 'center',
              width: '90%',
            },
          ]}>
          <View
            style={[
              styles.questionContainer,
              correct == null
                ? {borderColor: 'lightgrey'}
                : correct == true
                ? {borderColor: 'green'}
                : {borderColor: 'red'},
            ]}>
            <View style={{width: '100%'}}>
              <Text
                style={[
                  styles.title,
                  correct == null
                    ? {}
                    : correct == true
                    ? {color: 'green'}
                    : {color: 'red'},
                ]}>
                {correct == null
                  ? 'Phát âm từ đúng với gợi ý dưới đây'
                  : correct == true
                  ? 'Bạn trả lời đúng rồi! Hãy bấm nút "thêm gợi ý" để xem thêm ví dụ của từ trong câu nhé!'
                  : 'Bạn trả lời sai rồi, hãy thử lại nhé!'}
              </Text>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <View
                  style={[
                    {
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 5,
                      //width: 300,
                      maxWidth: '89%',
                      //height: 100,
                      borderRadius: 20,
                      elevation: 1,
                    },
                    getBackgroundColor,
                  ]}>
                  {getSuggestion()}
                  <View style={[styles.rightArrow, getBackgroundColor]}></View>
                  <View style={styles.rightArrowOverlap}></View>
                </View>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <LottieView
                source={getEmoji(correct)}
                autoPlay
                style={{
                  width: '45%',
                  paddingTop: 15,
                  alignSelf: 'center',
                  //marginRight: '50%',
                  paddingBottom: 15,
                }}
              />
              <TouchableOpacity
                onPress={changeSuggestion}
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  borderRadius: 10,
                  backgroundColor: 'lightgreen',
                  justifyContent: 'center',
                  height: 40,
                }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-Bold',
                    paddingHorizontal: 10,
                    position: 'relative',

                    color: 'green',
                  }}>
                  Thêm gợi ý
                </Text>
              </TouchableOpacity>
              {correct && (
                <TouchableOpacity
                  onPress={() => {
                    //setPinWordModalVisible(!pinWordModalVisible);
                    navigation.push('PinWordScreen', {
                      isModal: true,
                      wordData: data[wordId - 1],
                    });
                  }}
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
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
            </View>
          </View>

          <View style={styles.answerContainer}>
            <View style={styles.middleComponents}>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
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
                label="Từ mà bạn đọc được"
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
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                width: '50%',
                height: '75%',
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: 'red',
              }}>
              {/* SPEECH TO TEXT BUTTON */}
              <TouchableOpacity
                onPress={speaking}
                style={{
                  flex: 1,
                }}>
                <View>
                  <LottieView
                    ref={animation}
                    loop={start ? true : false}
                    autoPlay={false}
                    source={require('../../../assets/lottie/microphone.json')}
                    style={{
                      // paddingVertical: 100,
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                      alignSelf: 'center',
                      //marginRight: '50%',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          paddingBottom: 10,
        }}>
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
  );
};

export default LessonScreenPronuciation;

const styles = StyleSheet.create({
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Nunito-Black',
    fontSize: 20,
    color: 'black',
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
  },
  question: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Nunito-Medium',
    //paddingVertical: 20,
    //width: width,
  },
  middleComponents: {
    //paddingTop: height * 0.5,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  questionContainer: {
    height: height * 0.55 - 50,
    //height: '50%',
    minHeight: height * 0.55 - 50,
    maxHeight: height * 0.7 - 50,
    borderRadius: 10,
    borderTopWidth: 2,
    borderBottomWidth: 10,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    width: '100%',
    justifyContent: 'space-between',
  },
  answers: {color: 'black', fontFamily: 'Nunito-Medium'},
  answerContainer: {width: '100%', height: '40%'},
  rightArrow: {
    position: 'absolute',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },
  type: {
    fontFamily: 'Nunito-Black',
    fontSize: 17,
    textAlign: 'left',
    color: 'white',
  },
  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
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
