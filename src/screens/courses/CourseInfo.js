import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CourseStatisticPanel from '../../components/panels/CourseStatisticPanel';
import CourseStatisticPanelForWord from '../../components/panels/CourseStatisticPanelForWord';
import CourseDetailsPanel from '../../components/panels/CourseDetailsPanel';
import LessonListItem from './../../components/listItems/LessonListItem';
import LessonTypeChoicesModal from '../../components/modals/LessonTypeChoicesModal';
import {
  get_ContentofCourse,
  get_LessonDone,
  get_LessonofCourse,
  get_SumWordDone,
  get_SumWordNotDone,
  get_VocabularyByLesson,
} from '../../network/server';
import auth from '@react-native-firebase/auth';
import {getAnswers} from './../../services/answerService';
import AwesomeButton from 'react-native-really-awesome-button-fixed';

const CourseInfo = ({navigation, route}) => {
  const {courseId} = route.params;
  const LESSONS = [
    {
      id: '1',
      name: 'TALKING ABOUT YOURSELF',
      isLearned: true,
    },
    {
      id: '2',
      name: 'FAMILY',
      isLearned: true,
    },
    {
      id: '3',
      name: 'HOUSE AND HOME',
      isLearned: true,
    },
    {
      id: '4',
      name: 'DESCRIBING OBJECTS',
      isLearned: true,
    },
    {
      id: '5',
      name: 'PARTS OF THE BODY AND DESCRIBING PEOPLE',
      isLearned: true,
    },
    {
      id: '6',
      name: 'CLOTHES',
      isLearned: true,
    },
    {
      id: '7',
      name: 'TALKING ABOUT PEOPLE',
      isLearned: true,
    },
    {
      id: '8',
      name: 'SCHOOL AND UNIVERSITY',
      isLearned: true,
    },
    {
      id: '9',
      name: 'WORK AND JOBS',
      isLearned: true,
    },
    {
      id: '10',
      name: 'DAILY ROUTINES',
      isLearned: true,
    },
  ];
  const [content, setContent] = useState('');
  const [lessonDone, setlessonDone] = useState();
  const [wordDone, setwordDone] = useState();
  const [wordNotDone, setwordNotDone] = useState();
  const [data, setData] = useState([]);

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
  useEffect(() => {
    get_LessonDone(auth().currentUser.uid).then(res => {
      setlessonDone(res.length);
    });
    get_SumWordDone(auth().currentUser.uid).then(res => {
      setwordDone(res[0].WordDone);
    });

    get_SumWordNotDone(auth().currentUser.uid).then(res => {
      setwordNotDone(res[0].WordNotDone);
    });
    get_ContentofCourse(courseId).then(res => {
      setContent(res[0].Content);
    });
    get_LessonofCourse(auth().currentUser.uid, courseId).then(res => {
      setData(res);
    });
  }, []);

  const beginLessons = (lessonId, type) => {
    setModalVisible({modalVisible: !modalVisible, lessonName: '', id: -1});
    get_VocabularyByLesson(lessonId).then(res => {
      console.log(res[0].wordUri);
      navigation.push(type, {
        listlesson: data,
        indexlesson: indexlesson,
        lessonId: lessonId,
        wordId: 1,
        data: res,
        title: modalVisible.lessonName,
        maxNumWords: res.length,
        courseId: courseId,
        progress: 0,
        lastPos: 1,
        answers: getAnswers(res, res[0].word),
        exitLesson: () => {
          navigation.popToTop();
        },
      });
    });
    // navigation.push(type, {
    //   lessonId: lessonId,
    //   wordId: 1,
    //   data: WORDS,
    //   maxNumWords: WORDS.length,
    //   courseId: courseId,
    //   progress: 0,
    //   lastPos: 1,
    //   answers: getAnswers(WORDS, WORDS[0].word),
    //   exitLesson: () => {
    //     navigation.popToTop();
    //   },
    // });
  };

  const header = () => (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <LessonTypeChoicesModal
        modalVisible={modalVisible.modalVisible}
        setModalVisible={() =>
          setModalVisible({modalVisible: !modalVisible, lessonName: '', id: -1})
        }
        onPressSD={() => beginLessons(modalVisible.id, 'LessonScreenGuessing')}
        onPressGT={() => beginLessons(modalVisible.id, 'LessonScreenTyping')}
        onPressFC={() => beginLessons(modalVisible.id, 'LessonScreenFlashcard')}
        onPressSTT={() =>
          beginLessons(modalVisible.id, 'LessonScreenPronunciation')
        }
        onPressST={() => beginLessons(modalVisible.id, 'LessonScreenSentence')}
        onPressGM={() =>
          beginLessons(modalVisible.id, 'LessonScreenDefinition')
        }
        lessonName={modalVisible.lessonName} // Phần này truyền lesson name hoặc id, miễn là unique để get được lesson
        //navigation={navigation}
      />
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          width: '95%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CourseStatisticPanel
          source={require('../../assets/images/Course.png')}
          text={'Bài học đã học'}
          numDone={lessonDone}
          numNotDone={data.length}
          color={'green'}
        />
        <CourseStatisticPanelForWord
          source={require('../../assets/images/WordNotDone.png')}
          text={'Từ chưa thuộc'}
          numDone={40}
          // numNotDone={10}
          color={'red'}
        />
        <CourseStatisticPanelForWord
          source={require('../../assets/images/WordDone.png')}
          text={'Từ đã thuộc'}
          numDone={10}
          // numNotDone={10}
          color={'dodgerblue'}
        />
      </View>
      <CourseDetailsPanel
        information={
          // Muon xuong dung thi dung dau \n trong db MySQL
          // Data mau
          //     |
          //     V
          //'Cung cấp 3.000 từ vựng thông dụng nhất trong giao tiếp với 150 chủ đề.\nGiúp bạn ghi nhớ từ vựng hiệu quả thông qua phương pháp flashcard, cùng hình ảnh - âm thanh sinh động.\nGiúp bạn tăng khả năng giao tiếp và diễn đạt bằng tiếng Anh trong đa dạng các tình huống.\nGiúp bạn rút ngắn thời gian học tối ưu chỉ với 1/4 thời gian so với cách học thông thường.'
          content
        }
      />
      <View
        style={{
          width: '95%',
          paddingVertical: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.sectionHeader}>Bài học</Text>
          <View width={10} />
          <View
            style={{
              backgroundColor: 'lightgreen',
              borderBottomLeftRadius: 7,
              borderBottomRightRadius: 7,
              paddingHorizontal: 5,
              paddingVertical: 2,
            }}>
            <Text style={styles.numSectionHeader}>{data.length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  const [modalVisible, setModalVisible] = useState({
    modalVisible: false,
    id: -1,
    lessonName: '',
  });
  const [indexlesson, setIndexLesson] = useState();
  const renderItem = ({item, index}) => (
    <LessonListItem
      name={item.name}
      // source={require('../../assets/images/AdBannerImageForDebug.png')}
      source={{
        uri: item.uri,
      }}
      height={100}
      isLearned={item.isLearned}
      onPress={() => {
        if (index + 1 == data.length) {
          navigation.push('ExamNavigator', {
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
              totalTime: 1200,
            },
          });
        } else {
          setIndexLesson(index);
          setModalVisible({
            modalVisible: true,
            lessonName: item.name,
            id: item.id,
          });
        }
      }}
    />
  );
  const isCourseDone = (lessons, dataLength) => {
    return lessons.filter(e => e.isLearned === true).length === dataLength;
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{backgroundColor: 'white'}}
        removeClippedSubviews={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={header}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={
          <LessonListItem
            name={LESSONS[0].name}
            source={require('../../assets/images/AdBannerImageForDebug.png')}
            // source={{
            //   uri: item.uri,
            // }}
            height={100}
            isLearned={LESSONS[0].isLearned}
            onPress={() => {
              setModalVisible({
                modalVisible: true,
                lessonName: LESSONS[0].name,
                id: LESSONS[0].id,
              });
            }}
          />
        }
      />
      {isCourseDone(data, data.length) ? (
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            paddingVertical: 10,
            borderTopWidth: 2,
            borderTopColor: 'lightgrey',
          }}>
          <Text style={{width: '50%', fontFamily: 'Nunito-Black'}}>
            Bạn đã hoàn thành xong khoá học, hãy bấm kiểm tra để vượt qua khoá
            này:
          </Text>
          <View style={{flexDirection: 'row', width: '40%'}}>
            <AwesomeButton
              height={50}
              stretch
              borderWidth={1}
              borderRadius={20}
              borderColor={'darkgreen'}
              backgroundColor={'green'}
              backgroundDarker={'darkgreen'}
              onPress={() => {
                navigation.push('ExamNavigator', {
                  screen: 'ExamStartScreen',
                  params: {
                    title:
                      'Bài kiểm tra kết thúc khoá: ' +
                      // Phần này get ra tên course
                      'ENGLISH WORDS FOR STARTERS',
                    titleEnglish: 'Course Final Exam',
                    rules:
                      'Khum gian lận trong lúc kiểm tra.&Khum copy bài bạn kế bên.',
                    // phần này chèn content vào, content này là array các từ để thi
                    // content: ...
                    totalTime: 250,
                  },
                });
              }}>
              <Text style={{fontFamily: 'Nunito-Black', color: 'white'}}>
                KIỂM TRA
              </Text>
            </AwesomeButton>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CourseInfo;

const styles = StyleSheet.create({
  sectionHeader: {
    fontFamily: 'Nunito-Black',
    fontSize: 20,
  },
  numSectionHeader: {
    fontFamily: 'Nunito-Black',
    color: 'green',
  },
});
