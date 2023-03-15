import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProgressBar} from 'react-native-paper';
import {LogBox} from 'react-native';
import {getAnswers} from '../../services/answerService';
import {timeFormat} from './../../services/timeService';
LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
const {width, height} = Dimensions.get('window');

const ExamScreenGuessing = ({route, navigation}) => {
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const {wordId, progress, maxNumWords, data, timeLeft, totalCorrect, answers} =
    route.params;
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

  const [contWord, setContWord] = useState(
    //lastPos != null && lastPos > wordId ? word : '',
    '',
  );
  const neutralEmoji = require('../../assets/lottie/emoji/emoji-neutral.json');
  const correctEmoji = [
    require('../../assets/lottie/emoji/emoji-correct-happy.json'),
    require('../../assets/lottie/emoji/emoji-correct-love.json'),
  ];
  const incorrectEmoji = [
    require('../../assets/lottie/emoji/emoji-incorrect-sad.json'),
    require('../../assets/lottie/emoji/emoji-incorrect-shaking.json'),
  ];
  const changeSuggestion = () =>
    setSuggestion(
      (correct != true ? suggestion == 1 : suggestion == 3)
        ? 0
        : suggestion + 1,
    );
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
  const answerCheck = index => {
    // const remaining = [0, 1, 2, 3].filter(e => e !== index);
    // remaining.forEach(e => setCorrect({index: e, value: null}));
    if (wordId < maxNumWords)
      if (answers[index] === word) {
        setCorrect({index: index, value: true});
        setRunning(false);
        clearInterval(interval);
        setTimeout(() => {
          return navigation.push(
            ['ExamScreenGuessing', 'ExamScreenTyping'][(Math.random() * 2) | 0],
            {
              wordId: wordId + 1,
              data: data,
              maxNumWords: data.length,
              progress: progress + 1 / (maxNumWords - 1),
              timeLeft: timeLeft - progressTime,
              totalCorrect: totalCorrect + 1,
              answers: getAnswers(data, data[wordId - 1].word),
              exitLesson: () => {
                Alert.alert('THOÁT KIỂM TRA', 'Bạn có muốn thoát kiểm tra?', [
                  {
                    text: 'Không',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Có',
                    onPress: () => {
                      navigation.popToTop();
                    },
                  },
                ]);
              },
            },
          );
        }, 1000);
      } else {
        setCorrect({index: index, value: false});
        setRunning(false);
        clearInterval(interval);
        setTimeout(() => {
          return navigation.push(
            ['ExamScreenGuessing', 'ExamScreenTyping'][(Math.random() * 2) | 0],
            {
              wordId: wordId + 1,
              data: data,
              maxNumWords: data.length,
              progress: progress + 1 / (maxNumWords - 1),
              totalCorrect: totalCorrect,
              timeLeft: timeLeft - progressTime,
              answers: getAnswers(data, data[wordId - 1].word),
              exitLesson: () => {
                navigation.popToTop();
              },
            },
          );
        }, 1000);
      }
    else
      navigation.push('ExamCompleteScreen', {
        totalCorrect: totalCorrect,
        timeLeft: timeLeft - progressTime,
        maxNumWords: data.length,
        exitLesson: () => {
          navigation.popToTop();
        },
      });
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
        return {fontFamily: 'Nunito-Black', color: 'green', fontSize: 20};
      } else {
        return {fontFamily: 'Nunito-Black', color: 'red', fontSize: 20};
      }
    } else return {};
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
                    ? require('../../assets/images/AdBannerImageForDebug.png')
                    : require('../../assets/images/question.png')
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
                  //onPress={() => Auth.login(contUser, contPass)}
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
                  //onPress={() => Auth.login(contUser, contPass)}
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
                <AwesomeButton
                  springRelease
                  activeOpacity={0.8}
                  height={35}
                  width={35}
                  //onPress={() => Auth.login(contUser, contPass)}
                  backgroundDarker={'darkgreen'}
                  borderColor={'darkgreen'}
                  borderWidth={1}
                  backgroundColor={'white'}>
                  <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
                </AwesomeButton>
              </View>

              <Text style={styles.question}>{exampleMeaning}</Text>
            </View>
          </View>
        );
      default:
        return <Text>error</Text>;
    }
  };
  const [running, setRunning] = useState(true);
  const [progressTime, setProgressTime] = useState(0);
  useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setProgressTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    if (progressTime === timeLeft) {
      setCorrect(false);
      setRunning(false);
      clearInterval(interval);
      setTimeout(() => {
        navigation.push('ExamCompleteScreen', {
          totalCorrect: totalCorrect,
          timeLeft: 0,
          maxNumWords: data.length,
          exitLesson: () => {
            navigation.replace('DashboardScreen');
          },
        });
      }, 1000);
    }
  }, [progressTime]);
  return (
    <View
      style={[
        styles.container,
        {alignItems: 'center', backgroundColor: 'white'},
      ]}>
      <View style={{width: '100%'}}>
        <ProgressBar
          progress={progressTime / timeLeft}
          color={'green'}
          style={{
            marginTop: 50,
          }}
        />
      </View>

      <Text
        style={[
          {
            fontFamily: 'Nunito-Black',
            fontSize: 20,
            width: '100%',
            textAlign: 'center',
          },
          {color: 'darkgreen'},
        ]}>
        {timeFormat(progressTime, 'm', 's')} / {timeFormat(timeLeft, 'm', 's')}
      </Text>

      <View
        style={[
          styles.container,
          {
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
                ? 'Gõ từ đúng với gợi ý dưới đây'
                : correct.value == true
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
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        </View>

        {correct.value && (
          <View
            style={{
              width: '100%',
              height: '45%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'transparent',
              zIndex: 100,
            }}></View>
        )}
        <View style={styles.answerContainer}>
          <AwesomeButton
            activeOpacity={0.8}
            onPress={() => onPressAnswer(0)}
            backgroundDarker={getButtonColor(0)}
            borderColor={getButtonColor(0)}
            height={50}
            width={null}
            stretch
            borderWidth={1}
            backgroundColor={'white'}>
            <Text style={[styles.answers, getTextButtonStyle(0)]}>
              {answers[0]}
            </Text>
          </AwesomeButton>
          <AwesomeButton
            activeOpacity={0.8}
            onPress={() => onPressAnswer(1)}
            backgroundDarker={getButtonColor(1)}
            borderColor={getButtonColor(1)}
            borderWidth={1}
            height={50}
            width={null}
            stretch
            backgroundColor={'white'}>
            <Text style={[styles.answers, getTextButtonStyle(1)]}>
              {answers[1]}
            </Text>
          </AwesomeButton>
          <AwesomeButton
            activeOpacity={0.8}
            onPress={() => onPressAnswer(2)}
            backgroundDarker={getButtonColor(2)}
            borderColor={getButtonColor(2)}
            borderWidth={1}
            height={50}
            width={null}
            stretch
            backgroundColor={'white'}>
            <Text style={[styles.answers, getTextButtonStyle(2)]}>
              {answers[2]}
            </Text>
          </AwesomeButton>
          <AwesomeButton
            activeOpacity={0.8}
            onPress={() => onPressAnswer(3)}
            backgroundDarker={getButtonColor(3)}
            borderColor={getButtonColor(3)}
            borderWidth={1}
            height={50}
            width={null}
            stretch
            backgroundColor={'white'}>
            <Text style={[styles.answers, getTextButtonStyle(3)]}>
              {answers[3]}
            </Text>
          </AwesomeButton>
        </View>
      </View>
    </View>
  );
};

export default ExamScreenGuessing;

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
    height: '50%',
    minHeight: '50%',
    maxHeight: '70%',
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
});
