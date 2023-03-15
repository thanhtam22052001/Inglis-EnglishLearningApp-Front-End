import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import WordCorrectModal from '../../../components/modals/WordCorrectModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getAnswers,
  getAnswerSentences,
  WORD_TYPES,
} from '../../../services/answerService';
import {playCorrectAudio, playWrongAudio} from '../../../services/playAudio';

const {width, height} = Dimensions.get('window');
const LessonScreenDefinition = ({navigation, route}) => {
  const [answerSentences, setAnswerSentences] = useState(['']);
  useEffect(() => {
    const backAction = () => {
      //navigateBackward();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setAnswerSentences(getAnswerSentences(answers, data));
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
    answers,
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
  const [correct, setCorrect] = useState({index: -1, value: null});
  const [wordCorrectModalVisible, setWordCorrectModalVisible] = useState(false);
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
    if (wordId > maxNumWords - 1)
      return navigation.push('LessonCompleteScreen', {
        listlesson: listlesson,
        indexlesson: indexlesson,
        data: data,
        courseId: courseId,
        lessonId: lessonId,
        lessonName: title, // Phần này get từ api ra, bằng lessonId
        //goBack: goBack,
        title: title,
        type: 'Suy đoán',

        onPress: () => {
          navigation.popToTop();
        },
        exitLesson: () => {
          navigation.popToTop();
        },
      });
    else {
      return navigation.push('LessonScreenDefinition', {
        listlesson: listlesson,
        indexlesson: indexlesson,
        wordId: wordId + 1,
        progress: progress + 1 / (maxNumWords - 1),
        data: data,
        lessonId: lessonId,
        maxNumWords: maxNumWords,
        courseId: courseId,
        answers: getAnswers(data, data[wordId].word),
        exitLesson: () => {
          navigation.popToTop();
        },
      });
    }
  };
  const answerCheck = index => {
    // const remaining = [0, 1, 2, 3].filter(e => e !== index);
    // remaining.forEach(e => setCorrect({index: e, value: null}));
    if (answers[index] === word) {
      setCorrect({index: index, value: true});
      setWordCorrectModalVisible(true);
      playCorrectAudio();
    } else {
      setCorrect({index: index, value: false});
      playWrongAudio();
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
  const onPressAnswer = index => {
    answerCheck(index);
  };
  const getBackgroundColor =
    correct.value != false
      ? {backgroundColor: 'green'}
      : {backgroundColor: 'red'};
  const getButtonColor = index => {
    if (correct.index === index) {
      if (correct.value === true) {
        return 'green';
      } else {
        return 'red';
      }
    } else return 'lightgrey';
  };
  const getTextButtonStyle = index => {
    if (correct.index === index) {
      if (correct.value === true) {
        return {fontFamily: 'Nunito-Black', color: 'green', fontSize: 17};
      } else {
        return {fontFamily: 'Nunito-Black', color: 'red', fontSize: 17};
      }
    } else return {};
  };

  const getSuggestion = () => {
    switch (suggestion) {
      case 0:
        return (
          <View>
            <Text style={styles.type}>{WORD_TYPES[type].toUpperCase()}</Text>
            <Text style={styles.question}>{word.toUpperCase()}</Text>
          </View>
        );
      // case 1:
      //   return (
      //     <View>
      //       <Text style={styles.type}>Loại từ:</Text>
      //       <Text style={styles.question}>{WORD_TYPES[type]}</Text>
      //     </View>
      //   );
      // case 1:
      //   return (
      //     <View style={{flexDirection: 'row'}}>
      //       <View
      //         style={{
      //           height: 80,
      //           aspectRatio: 1,
      //           backgroundColor: 'white',
      //           borderRadius: 10,
      //           marginRight: 10,
      //         }}>
      //         <Image
      //           //resizeMode="cover"
      //           source={
      //             correct.value == true
      //               ? {uri: wordUri + ''}
      //               : require('../../../assets/images/question.png')
      //           }
      //           style={{height: '100%', aspectRatio: 1}}
      //         />
      //       </View>

      //       <View style={{maxWidth: '65%'}}>
      //         <View
      //           style={{
      //             flexDirection: 'row',
      //             alignItems: 'center',
      //           }}>
      //           <AwesomeButton
      //             springRelease
      //             activeOpacity={0.8}
      //             height={35}
      //             width={35}
      //             onPress={() => speech_word(word)}
      //             backgroundDarker={'darkgreen'}
      //             borderColor={'darkgreen'}
      //             borderWidth={1}
      //             backgroundColor={'white'}>
      //             <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
      //           </AwesomeButton>
      //         </View>
      //         <View
      //           style={{
      //             flexDirection: 'row',
      //             alignItems: 'center',
      //             justifyContent: 'center',
      //           }}>
      //           <Text style={styles.type}>{pronunciation}</Text>
      //         </View>
      //         <View style={{flexDirection: 'row', alignItems: 'center'}}>
      //           <Text style={styles.type}>({type})</Text>
      //           <Text
      //             style={[styles.question, {paddingLeft: 2, maxWidth: '80%'}]}>
      //             {meaning}
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   );
      // case 2:
      //   return (
      //     <View>
      //       <View>
      //         <View style={{flexDirection: 'row'}}>
      //           <AwesomeButton
      //             springRelease
      //             activeOpacity={0.8}
      //             height={35}
      //             width={35}
      //             onPress={() => speech_word(example)}
      //             backgroundDarker={'darkgreen'}
      //             borderColor={'darkgreen'}
      //             borderWidth={1}
      //             backgroundColor={'white'}>
      //             <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
      //           </AwesomeButton>
      //         </View>

      //         <Text style={styles.question}>{example}</Text>
      //       </View>
      //     </View>
      //   );
      // case 3:
      //   return (
      //     <View>
      //       <View>
      //         <View style={{flexDirection: 'row'}}>
      //           {/* <AwesomeButton
      //             springRelease
      //             activeOpacity={0.8}
      //             height={35}
      //             width={35}
      //             //onPress={() => Auth.login(contUser, contPass)}
      //             backgroundDarker={'darkgreen'}
      //             borderColor={'darkgreen'}
      //             borderWidth={1}
      //             backgroundColor={'white'}>
      //             <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
      //           </AwesomeButton> */}
      //         </View>

      //         <Text style={styles.question}>{exampleMeaning}</Text>
      //       </View>
      //     </View>
      //   );
      // default:
      //   return <Text>error</Text>;
    }
  };
  const changeSuggestion = () =>
    setSuggestion(suggestion == 0 ? 0 : suggestion + 1);
  return (
    <View
      style={[
        styles.container,
        {alignItems: 'center', backgroundColor: 'white'},
      ]}>
      <WordCorrectModal
        wordCorrectModalVisible={wordCorrectModalVisible}
        word={word}
        length={data.length}
        wordId={wordId}
        navigateForward={navigateForward}
      />
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
            correct.value == null
              ? {borderColor: 'lightgrey'}
              : correct.value == true
              ? {borderColor: 'green'}
              : {borderColor: 'red'},
          ]}>
          <View style={{width: '100%'}}>
            <Text
              style={[
                styles.title,
                correct.value == null
                  ? {}
                  : correct.value == true
                  ? {color: 'green'}
                  : {color: 'red'},
              ]}>
              {correct.value == null
                ? 'Chọn từ đúng với gợi ý dưới đây'
                : correct.value == true
                ? 'Bạn trả lời đúng rồi!'
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
              source={getEmoji(correct.value)}
              autoPlay
              style={{
                width: '45%',
                paddingTop: 15,
                alignSelf: 'center',
                //marginRight: '50%',
                paddingBottom: 15,
              }}
            />
            {/* <TouchableOpacity
              onPress={changeSuggestion}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                borderRadius: 10,
                backgroundColor: 'lightgreen',
              }}>
              <Text
                style={{
                  fontFamily: 'Nunito-Bold',
                  padding: 10,
                  color: 'green',
                }}>
                Thêm gợi ý
              </Text>
            </TouchableOpacity> */}
            {correct.value && (
              <TouchableOpacity
                onPress={() => {
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

        <View
          style={[
            styles.answerContainer,
            // {backgroundColor: 'red'}
          ]}>
          <AwesomeButton
            activeOpacity={0.8}
            onPress={() => onPressAnswer(0)}
            backgroundDarker={getButtonColor(0)}
            borderColor={getButtonColor(0)}
            height={80}
            width={null}
            stretch
            borderWidth={1}
            backgroundColor={'white'}>
            <Text style={[styles.answers, getTextButtonStyle(0)]}>
              {answerSentences[0]}
            </Text>
          </AwesomeButton>
          <AwesomeButton
            activeOpacity={0.8}
            onPress={() => onPressAnswer(1)}
            backgroundDarker={getButtonColor(1)}
            borderColor={getButtonColor(1)}
            borderWidth={1}
            height={80}
            width={null}
            stretch
            backgroundColor={'white'}>
            <Text style={[styles.answers, getTextButtonStyle(1)]}>
              {answerSentences[1]}
            </Text>
          </AwesomeButton>
          <AwesomeButton
            activeOpacity={0.8}
            onPress={() => onPressAnswer(2)}
            backgroundDarker={getButtonColor(2)}
            borderColor={getButtonColor(2)}
            borderWidth={1}
            height={80}
            width={null}
            stretch
            backgroundColor={'white'}>
            <Text style={[styles.answers, getTextButtonStyle(2)]}>
              {answerSentences[2]}
            </Text>
          </AwesomeButton>
          <AwesomeButton
            activeOpacity={0.8}
            onPress={() => onPressAnswer(3)}
            backgroundDarker={getButtonColor(3)}
            borderColor={getButtonColor(3)}
            borderWidth={1}
            height={80}
            width={null}
            stretch
            backgroundColor={'white'}>
            <Text style={[styles.answers, getTextButtonStyle(3)]}>
              {answerSentences[3]}
            </Text>
          </AwesomeButton>
        </View>
      </View>
    </View>
  );
};

export default LessonScreenDefinition;

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
  questionContainer: {
    height: '35%',
    minHeight: '35%',
    maxHeight: '70%',
    borderRadius: 10,
    borderTopWidth: 2,
    borderBottomWidth: 10,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    width: '100%',
    justifyContent: 'space-between',
  },
  answers: {color: 'black', fontFamily: 'Nunito-Medium', paddingLeft: 5},
  answerContainer: {width: '100%', height: '60%'},
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
    textAlign: 'center',
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
});
