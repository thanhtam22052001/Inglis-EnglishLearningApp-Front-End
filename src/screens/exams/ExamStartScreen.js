import {StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {setInformationInData} from '../../services/flatlistService';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import LottieView from 'lottie-react-native';
import {getAnswers} from '../../services/answerService';
import {get_AllVocabularyByCourse} from '../../network/server';

const ExamStartScreen = ({navigation, route}) => {
  const {
    courseId,
    lessonName,
    id,
    title,
    titleEnglish,
    rules,
    content,
    totalTime,
  } = route.params;
  const [start, setStart] = useState(false);
  const [data, setData] = useState([]);
  const animation = useRef(null);
  useEffect(() => {
    return () => {
      setStart(false); // This worked for me
    };
  }, []);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    if (start === false) {
      animation.current.play(22, 108);
    } else if (start === true) {
      animation.current.play(108, 144);
    }
  }, [start]);

  useEffect(() => {
    get_AllVocabularyByCourse(courseId).then(res => {
      setData(res);
    });
  }, []);

  const WORDS = [
    {
      id: '1',
      word: 'Name',
      type: 'n',
      pronunciation: '/neim/',
      definition:
        'A word or words that a particular person, animal, place or thing is known by',
      meaning: 'Tên, tên gọi',
      example: 'Hello everyone, my name is Tam tam tam tam tam tam tam tam',
      exampleMeaning:
        'Xin chào mọi người, tui tên là Tâm nha nha nha nha nha nha nha nha nha nha nha nha nha nha',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '2',
      word: 'Hello',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '3',
      word: 'Wow',
      type: 'n',
      pronunciation: '/neim/',
      definition:
        'A word or words that a particular person, animal, place or thing is known by',
      meaning: 'Tên, tên gọi',
      example: 'Hello everyone, my name is Tam tam tam tam tam tam tam tam',
      exampleMeaning:
        'Xin chào mọi người, tui tên là Tâm nha nha nha nha nha nha nha nha nha nha nha nha nha nha',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '4',
      word: 'Hi',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '5',
      word: 'You',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '6',
      word: 'Hehe',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '7',
      word: 'We',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '8',
      word: 'They',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '9',
      word: 'Friends',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '10',
      word: 'What',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
    },
  ];
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          paddingBottom: 200,
        }}>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: 'darkgreen',
            paddingBottom: 5,
            textAlign: 'center',
          }}>
          {titleEnglish ?? 'Foundation Text'}
        </Text>
        <Text
          style={{
            fontFamily: 'Nunito-Black',
            fontSize: 25,
            color: 'darkgreen',
            paddingBottom: 5,
            textAlign: 'center',
          }}>
          {title ?? 'Bài kiểm tra kiến thức nền'}
        </Text>
        <Text
          style={{
            fontFamily: 'Nunito-Medium',
            fontSize: 15,
            color: 'black',
            paddingBottom: 5,
          }}>
          Dưới đây là một số quy định bạn cần lưu ý:
        </Text>
        {setInformationInData(
          rules ??
            'Bài kiểm tra có tất cả 10 câu hỏi, chia đều ở hai chế độ: Suy đoán, Gõ từ.&Bạn sẽ có 1 phút để hoàn thành từng câu hỏi trong bài kiểm tra.&Bạn sẽ không được quay về để trả lời lại và chỉ được phép đi tiếp sau khi trả lời đúng. Do đó, hãy suy nghĩ kỹ trước khi đưa ra đáp án.&Sau khi hoàn tất bài kiểm tra, bạn sẽ được xếp loại.',
          '\u2605',
        )}
        <LottieView
          ref={animation}
          source={require('../../assets/lottie/rocketExam.json')}
          style={{width: '50%'}}
          autoPlay={false}
          loop={false}
          // onAnimationFinish={() => {
          //   if (start === false) animation.current.play(97, 100);
          //   animation.current.loop = true;
          //   //animation.speed = 0.1;
          // }}
        />
        <View style={{flexDirection: 'row', width: '40%'}}>
          <AwesomeButton
            springRelease
            stretch
            height={50}
            borderRadius={20}
            backgroundColor="green"
            backgroundDarker="darkgreen"
            borderColor="darkgreen"
            progress
            onPress={next => {
              setStart(true);
              setTimeout(() => {
                navigation.push(
                  ['ExamScreenGuessing', 'ExamScreenTyping'][
                    (Math.random() * 2) | 0
                  ],
                  {
                    wordId: 1,
                    data: content ?? data,
                    maxNumWords:
                      content !== undefined ? content.length : data.length,
                    progress: 0,
                    timeLeft: totalTime ?? 1200,
                    totalCorrect: 0,
                    answers:
                      content !== undefined
                        ? getAnswers(content, content[0].word)
                        : getAnswers(data, data[0].word),
                    exitLesson: () => {
                      Alert.alert(
                        'THOÁT KIỂM TRA',
                        'Bạn có muốn thoát kiểm tra?',
                        [
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
                        ],
                      );
                    },
                  },
                );
                next();
              }, 1000);
            }}
            borderWidth={1}>
            <Text style={{color: 'white', fontFamily: 'Nunito-Black'}}>
              SẴN SÀNG
            </Text>
          </AwesomeButton>
        </View>
      </View>
    </View>
  );
};

export default ExamStartScreen;

const styles = StyleSheet.create({});
