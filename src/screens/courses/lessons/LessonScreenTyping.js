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
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {speech_word} from '../../../services/voice';
import {playCorrectAudio, playWrongAudio} from '../../../services/playAudio';

const {width, height} = Dimensions.get('window');
const LessonScreenTyping = ({navigation, route}) => {
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
        return navigation.push('LessonScreenTyping', {
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
      return navigation.push('LessonScreenTyping', {
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
      Keyboard.dismiss();
      return true;
    } else {
      setCorrect(false);
      playWrongAudio();
      return false;
    }
  };
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
                  ? 'Gõ từ đúng với gợi ý dưới đây'
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
            {correct === false ? (
              <View style={{flexDirection: 'row', paddingTop: 10}}>
                <Text style={{fontFamily: 'Nunito-Black', color: 'darkgreen'}}>
                  Suỵt... đáp án đúng là{' '}
                </Text>
                <Text style={{fontFamily: 'Nunito-Black', color: 'green'}}>
                  {word.toUpperCase()}{' '}
                </Text>
                <Text style={{fontFamily: 'Nunito-Black', color: 'darkgreen'}}>
                  đó bạn.
                </Text>
              </View>
            ) : (
              <></>
            )}
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

export default LessonScreenTyping;

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
