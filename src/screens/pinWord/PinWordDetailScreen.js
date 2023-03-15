import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import PinWordWordListItem from '../../components/listItems/PinWordWordListItem';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import LessonTypeChoicesModal from '../../components/modals/LessonTypeChoicesModal';
import {getAnswers} from '../../services/answerService';
import {get_VocabularyByFolder} from '../../network/server';
import {speech_word} from '../../services/voice';
const PinWordDetailScreen = ({route, navigation}) => {
  const idFolder = route.params.idFolder;
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState([]);
  //   word: 'What',
  // type: 'n',
  // pronunciation: '/neim/',
  // definition: 'A word to say when you meet someone',
  // meaning: 'Xin chào',
  // example: 'Hello my friends',
  // exampleMeaning: 'Xin chào bạn tui',
  // wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
  useEffect(() => {
    get_VocabularyByFolder(idFolder).then(res => {
      setContent(res);
    });
  }, []);

  const renderItems = ({item, index}) => (
    <PinWordWordListItem
      onPressWord={() => {
        navigation.push('PinWordDetailWordScreen', {
          data: content[index + 1],
        });
      }}
      onPressSound={() => speech_word(item.word)}
      word={item.word}
      type={item.type}
      wordUri={item.wordUri}
      meaning={item.meaning}
      definition={item.definition}
    />
  );
  const beginLessons = type => {
    setModalVisible(!modalVisible);
    navigation.push('LessonNavigator', {
      screen: type,
      params: {
        isPinWord: true,
        wordId: 1,
        data: content,
        maxNumWords: content.length,
        progress: 0,
        lastPos: 1,
        answers: getAnswers(content, content[0].word),
        exitLesson: () => {
          navigation.popToTop();
        },
      },
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={content}
        renderItem={renderItems}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text style={{fontFamily: 'Nunito-Black'}}>Thư mục rỗng</Text>
          </View>
        }
      />
      <LessonTypeChoicesModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
        onPressSD={() => beginLessons('LessonScreenGuessing')}
        onPressGT={() => beginLessons('LessonScreenTyping')}
        onPressFC={() => beginLessons('LessonScreenFlashcard')}
      />
      <View
        style={{
          width: '100%',
          height: 55,
          borderTopWidth: 2,
          borderTopColor: 'lightgrey',
        }}>
        <AwesomeButton
          springRelease
          height={50}
          width={175}
          borderWidth={1}
          borderRadius={10}
          borderColor={'darkgreen'}
          onPress={() => {
            setModalVisible(true);
          }}
          backgroundDarker={'darkgreen'}
          backgroundColor={'green'}>
          <Text
            style={{
              padding: 10,
              fontFamily: 'Nunito-Black',
              fontSize: 15,
              color: 'white',
            }}>
            ÔN TẬP
          </Text>
        </AwesomeButton>
      </View>
    </View>
  );
};

export default PinWordDetailScreen;

const styles = StyleSheet.create({});
