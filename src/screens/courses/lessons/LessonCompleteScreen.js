import {StyleSheet, Text, View, ScrollView} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import LottieView from 'lottie-react-native';
import React, {useState, useEffect} from 'react';
import LessonTypeChoicesModal from '../../../components/modals/LessonTypeChoicesModal';
import {getAnswers} from '../../../services/answerService';
import {get_VocabularyByLesson, insert_Learning} from '../../../network/server';
import auth from '@react-native-firebase/auth';
const LessonCompleteScreen = ({navigation, route}) => {
  const {
    listlesson,
    indexlesson,
    data,
    courseId,
    title,
    type,
    exitLesson,
    lessonId,
    lessonName,
  } = route.params;
  //console.log(title);
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
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
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
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '3',
      word: 'Namdsadae',
      type: 'n',
      pronunciation: '/neim/',
      definition:
        'A word or words that a particular person, animal, place or thing is known by',
      meaning: 'Tên, tên gọi',
      example: 'Hello everyone, my name is Tam tam tam tam tam tam tam tam',
      exampleMeaning:
        'Xin chào mọi người, tui tên là Tâm nha nha nha nha nha nha nha nha nha nha nha nha nha nha',
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '4',
      word: 'Helasdasdalo',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '5',
      word: 'Heldasdaslo',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '6',
      word: 'Heldsadlo',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '7',
      word: 'Helldsadaso',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '8',
      word: 'Heldsadadcasdlo',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '9',
      word: 'Heldasdasdalo',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
    {
      id: '10',
      word: 'Helldasdadasdasdo',
      type: 'n',
      pronunciation: '/neim/',
      definition: 'A word to say when you meet someone',
      meaning: 'Xin chào',
      example: 'Hello my friends',
      exampleMeaning: 'Xin chào bạn tui',
      wordUri: require('../../../assets/images/AdBannerImageForDebug.png'),
    },
  ];
  const [nextdata, setNextData] = useState([]);
  useEffect(() => {
    if (listlesson.length > indexlesson + 1) {
      get_VocabularyByLesson(listlesson[indexlesson + 1].id).then(res => {
        setNextData(res);
      });
    }
    insert_Learning(auth().currentUser.uid, courseId, lessonId, 'Done');
  }, []);
  const allType = ['Suy đoán', 'Gõ từ', 'Flashcard'].filter(e => e !== type);
  const beginLessons = (lessonId, type) => {
    if (modalVisible.isContinous == 'HOCLAI') {
      setModalVisible({
        isContinous: '',
        modalVisible: !modalVisible,
        lessonName: '',
        id: -1,
      });
      navigation.push(type, {
        listlesson: listlesson,
        indexlesson: indexlesson,
        lessonId: lessonId,
        wordId: 1,
        data: data,
        maxNumWords: data.length,
        courseId: courseId,
        progress: 0,
        lastPos: 1,
        answers: getAnswers(data, data[0].word),
        exitLesson: () => {
          navigation.popToTop();
        },
      });
    } else {
      setModalVisible({
        isContinous: '',
        modalVisible: !modalVisible,
        lessonName: '',
        id: -1,
      });
      navigation.push(type, {
        listlesson: listlesson,
        indexlesson: indexlesson + 1,
        lessonId: listlesson[indexlesson].id,
        wordId: 1,
        data: nextdata,
        maxNumWords: nextdata.length,
        courseId: courseId,
        progress: 0,
        lastPos: 1,
        answers: getAnswers(nextdata, nextdata[0].word),
        exitLesson: () => {
          navigation.popToTop();
        },
      });
    }
  };
  const [modalVisible, setModalVisible] = useState({
    isContinous: '',
    modalVisible: false,
    id: -1,
    lessonName: '',
  });
  // Nếu là lesson cuối cùng thì true, cái này tự làm nha
  const lastLesson = false;

  if (listlesson.length > indexlesson + 2) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <LessonTypeChoicesModal
            modalVisible={modalVisible.modalVisible}
            setModalVisible={() =>
              setModalVisible({
                isContinous: '',
                modalVisible: !modalVisible,
                lessonName: '',
                id: -1,
              })
            }
            onPressSD={() =>
              beginLessons(modalVisible.id, 'LessonScreenGuessing')
            }
            onPressGT={() =>
              beginLessons(modalVisible.id, 'LessonScreenTyping')
            }
            onPressFC={() =>
              beginLessons(modalVisible.id, 'LessonScreenFlashcard')
            }
            lessonName={modalVisible.lessonName} // Phần này truyền lesson name hoặc id, miễn là unique để get được lesson
            //navigation={navigation}
          />
          <LottieView
            source={require('../../../assets/lottie/excellent.json')}
            autoPlay
            loop={false}
            style={{width: '90%', alignSelf: 'center'}}
          />
          <Text style={{fontFamily: 'Nunito-Black', alignSelf: 'center'}}>
            Chúc mừng bạn vừa hoàn thành phần học
          </Text>
          <Text
            style={{
              fontFamily: 'Nunito-Black',
              alignSelf: 'center',
              fontSize: 30,
              color: 'green',
              paddingTop: 15,
            }}>
            {type}
          </Text>
          <Text
            style={{
              fontFamily: 'Nunito-Medium',
              alignSelf: 'center',
              color: 'black',
              width: '75%',
              paddingTop: 15,
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            Bây giờ bạn có thể tiếp tục với 2 hình thức học khác (
            {allType.join(', ')}) ở bài học này hoặc chuyển qua bài tiếp theo
            nếu đã chắc chắn nha!
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <AwesomeButton
            springRelease
            activeOpacity={0.8}
            height={50}
            width={null}
            stretch
            onPress={() => {
              setModalVisible({
                isContinous: 'HOCLAI',
                modalVisible: true,
                lessonName: lessonName,
                id: lessonId,
              });
            }}
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
              HỌC LẠI
            </Text>
          </AwesomeButton>
          {lastLesson === false ? <View width={'35%'} /> : <></>}
          {lastLesson === false ? (
            <AwesomeButton
              springRelease
              activeOpacity={0.8}
              height={50}
              width={null}
              stretch
              backgroundDarker={'darkgreen'}
              borderColor={'darkgreen'}
              //Chỉnh cho qua bài kế tiếp
              onPress={() => {
                setModalVisible({
                  isContinous: 'HOCTIEP',
                  modalVisible: true,
                  lessonName: listlesson[indexlesson + 1].name,
                  id: listlesson[indexlesson + 1].id,
                });
              }}
              borderWidth={1}
              backgroundColor={'green'}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Nunito-Black',
                  fontSize: 17,
                }}>
                TIẾP TỤC
              </Text>
            </AwesomeButton>
          ) : (
            <></>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <LessonTypeChoicesModal
            modalVisible={modalVisible.modalVisible}
            setModalVisible={() =>
              setModalVisible({
                isContinous: '',
                modalVisible: !modalVisible,
                lessonName: '',
                id: -1,
              })
            }
            onPressSD={() =>
              beginLessons(modalVisible.id, 'LessonScreenGuessing')
            }
            onPressGT={() =>
              beginLessons(modalVisible.id, 'LessonScreenTyping')
            }
            onPressFC={() =>
              beginLessons(modalVisible.id, 'LessonScreenFlashcard')
            }
            lessonName={modalVisible.lessonName} // Phần này truyền lesson name hoặc id, miễn là unique để get được lesson
            //navigation={navigation}
          />
          <LottieView
            source={require('../../../assets/lottie/excellent.json')}
            autoPlay
            loop={false}
            style={{width: '90%', alignSelf: 'center'}}
          />
          <Text style={{fontFamily: 'Nunito-Black', alignSelf: 'center'}}>
            Chúc mừng bạn vừa hoàn thành phần học
          </Text>
          <Text
            style={{
              fontFamily: 'Nunito-Black',
              alignSelf: 'center',
              fontSize: 30,
              color: 'green',
              paddingTop: 15,
            }}>
            {type}
          </Text>
          <Text
            style={{
              fontFamily: 'Nunito-Medium',
              alignSelf: 'center',
              color: 'black',
              width: '75%',
              paddingTop: 15,
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            Bây giờ bạn có thể tiếp tục với 2 hình thức học khác (
            {allType.join(', ')}) ở bài học này hoặc chuyển qua bài tiếp theo
            nếu đã chắc chắn nha!
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <AwesomeButton
            springRelease
            activeOpacity={0.8}
            height={50}
            width={null}
            stretch
            onPress={() => {
              setModalVisible({
                isContinous: 'HOCLAI',
                modalVisible: true,
                lessonName: lessonName,
                id: lessonId,
              });
            }}
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
              HỌC LẠI
            </Text>
          </AwesomeButton>
          {lastLesson === false ? <View width={'35%'} /> : <></>}
          {lastLesson === false ? (
            <AwesomeButton
              springRelease
              activeOpacity={0.8}
              height={50}
              width={null}
              stretch
              backgroundDarker={'darkgreen'}
              borderColor={'darkgreen'}
              //Chỉnh cho qua bài kế tiếp
              onPress={() => {
                navigation.push('ExamNavigator', {
                  lessonName: listlesson[indexlesson + 1].name,
                  id: listlesson[indexlesson + 1].id,
                  screen: 'ExamStartScreen',
                  params: {
                    courseId: courseId,
                    title:
                      'Bài kiểm tra kết thúc khoá: ' +
                      // Phần này get ra tên course
                      'ENGLISH WORDS FOR STARTERS',
                    titleEnglish: 'Course Final Exam',
                    rules:
                      'Khum gian lận trong lúc kiểm tra.&Khum copy bài bạn kế bên.',
                    // phần này chèn content vào, content này là array các từ để thi
                    // content: ...
                    totalTime: 20,
                  },
                });
              }}
              borderWidth={1}
              backgroundColor={'green'}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Nunito-Black',
                  fontSize: 17,
                }}>
                KIỂM TRA
              </Text>
            </AwesomeButton>
          ) : (
            <></>
          )}
        </View>
      </View>
    );
  }
};

export default LessonCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: 75,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '90%',
  },
});
