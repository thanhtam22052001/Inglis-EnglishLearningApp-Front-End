import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {get_APiDictionary} from '../../network/server';
import {speech_word} from '../../services/voice';
import Tts from 'react-native-tts';
import 'react-native-get-random-values';
import {SelectableText} from '@alentoma/react-native-selectable-text';

const WordDetailScreen = ({navigation, route}) => {
  //const {word, phonetic, phonetics, meanings}
  const [word, setWord] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [phonetics, setPhonetics] = useState([
    {
      audio: '',
      sourceUrl: '',
      license: {
        name: '',
        url: '',
      },
    },
  ]);
  const [meanings, setMeanings] = useState([
    {
      partOfSpeech: '',
      definitions: [
        {
          definition: '',
          synonyms: [],
          antonyms: [],
        },
      ],
      synonyms: [''],
      antonyms: [],
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  // const [definitions, setDefinitions] = useState(meanings[0].definitions);
  // const [synonyms, setSynonyms] = useState(meanings[0].synonyms);
  // const [antonyms, setAntonyms] = useState(meanings[0].antonyms);

  const [definitions, setDefinitions] = useState([]);
  const [synonyms, setSynonyms] = useState('');
  const [antonyms, setAntonyms] = useState('');

  useEffect(() => {
    get_APiDictionary(route.params.data).then(res => {
      setWord(res[0].word);
      // console.log(res[0].meanings[0].definitions);
      // let resPhonetic = res[0].phonetic;
      // let resPhonetics = res[0].phonetics.json();
      // let resMeanings = res[0].meanings.json();
      setPhonetic(res[0].phonetic);
      setPhonetics(res[0].phonetics);
      setMeanings(res[0].meanings);
      let re = res[0].meanings;
      setDefinitions(re[0].definitions);
      setSynonyms(re[0].synonyms);
      setAntonyms(re[0].antonyms);
    });
  }, []);
  // useEffect(() => {
  //   setDefinitions(meanings[activeIndex].definitions);
  // }, [activeIndex]);
  // useEffect(() => {
  //   setSynonyms(meanings[activeIndex].synonyms);
  // }, [activeIndex]);
  // useEffect(() => {
  //   setAntonyms(meanings[activeIndex].antonyms);
  // }, [activeIndex]);
  // Phần phonetics quá nhiều chỉ nên lấy 2 cái đầu
  const handlevoice = tu => {
    Tts.speak(tu);
  };
  const renderPhonetic = ({item}) => (
    <>
      {item.audio !== '' && item.audio.indexOf('us.mp3') > -1 ? (
        <View
          style={{
            flexDirection: 'row',
            height: 40,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 10}}>
              <AwesomeButton
                springRelease
                activeOpacity={0.8}
                height={35}
                width={35}
                //onPress={speech_word(word)}
                onPress={() => speech_word(word)}
                backgroundDarker={'darkgreen'}
                borderColor={'darkgreen'}
                borderWidth={1}
                backgroundColor={'white'}>
                <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
              </AwesomeButton>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.phonetics}>{item.text}</Text>
            </View>
          </View>
        </View>
      ) : null}
      {/* <View style={{justifyContent: 'center'}}>
        <Text style={styles.phonetics}>{item.text}</Text>
      </View> */}
      {/* {item.audio === undefined || item.audio === '' ? (
        <View />
      ) : (
        <View style={{paddingLeft: 55}}>
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
      )} */}
    </>
  );
  const renderPartOfSpeech = ({item, index}) => {
    if (activeIndex !== index) {
      return (
        <TouchableOpacity
          onPress={() => {
            setActiveIndex(index);
            setDefinitions(meanings[activeIndex].definitions);
          }}
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderTopWidth: 2,
              borderRightWidth: 2,
              borderBottomWidth: 2,
              borderColor: 'dodgerblue',
            },
            index === 0
              ? {
                  borderLeftWidth: 2,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }
              : {borderLeftWidth: 1},
            index === meanings.length - 1
              ? {borderTopRightRadius: 5, borderBottomRightRadius: 5}
              : {},
          ]}>
          <Text
            style={{
              fontFamily: 'Nunito-Bold',
              fontSize: 17,
              color: 'dodgerblue',
            }}>
            {item.partOfSpeech}
          </Text>
        </TouchableOpacity>
      );
    } else
      return (
        <TouchableOpacity
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderWidth: 2,
              backgroundColor: 'dodgerblue',
              borderColor: 'dodgerblue',
            },
            index === 0
              ? {
                  borderLeftWidth: 2,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }
              : {borderLeftWidth: 1},
            index === meanings.length - 1
              ? {borderTopRightRadius: 5, borderBottomRightRadius: 5}
              : {},
          ]}>
          <Text
            style={{fontFamily: 'Nunito-Bold', fontSize: 17, color: 'white'}}>
            {item.partOfSpeech}
          </Text>
        </TouchableOpacity>
      );
  };
  const renderDefinitions = ({item, index}) => (
    <View nestedScrollEnabled>
      <SelectableText
        menuItems={['Foo', 'Bar']}
        value={`${index + 1}. ${item.definition}`}
        style={[styles.text, {color: 'black', fontFamily: 'Nunito-Medium'}]}
        selectionColor="orange"
        //highlights={[{id: 1, start: 1, end: 10}]}
      ></SelectableText>
    </View>
  );
  const renderSynonyms = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.push('WordDetailScreen', {
          data: item,
        });
      }}
      // Phần này sẽ gọi api chọn tiếp đến từ được chọn
    >
      <Text
        style={[
          styles.text,
          {
            color: 'dodgerblue',
            textTransform: 'capitalize',
            fontFamily: 'Nunito-Black',
          },
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const renderAntonyms = ({item}) => (
    <TouchableOpacity
    // onPress={() => {
    //   navigation.push('WordDetailScreen', {
    //     data: item,
    //   });
    // }}
    // Phần này sẽ gọi api chọn tiếp đến từ được chọn
    >
      <Text
        style={[
          styles.text,
          {
            color: 'dodgerblue',
            textTransform: 'capitalize',
            fontFamily: 'Nunito-Black',
          },
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontFamily: 'Nunito-Black',
              textTransform: 'capitalize',
              fontSize: 50,
              color: 'black',
            }}>
            {word}
          </Text>
          <View>
            <AwesomeButton
              onPress={() => {
                // Lưu ý: wordData ở dưới chỉ là tham khảo, do một số field từ api sẽ khác với trên db nha,
                //thí dụ type của api là noun, nhưng db của mình là n, nên có 1 service để convert
                const wordData = {
                  word: word,
                  type: meanings[0].partOfSpeech,
                  definition: meanings[0].definitions[0].definition,
                  pronunciation: phonetic ?? phonetics[0].text,
                  meaning: 'Gi gi do bang tieng Viet',
                  example: '',
                  exampleMeaning: '',
                  wordUri: '',
                };
                navigation.push('PinWordScreen', {
                  isModal: true,
                  wordData: wordData,
                });
              }}
              springRelease
              activeOpacity={0.8}
              backgroundDarker={'darkgreen'}
              height={50}
              borderColor={'darkgreen'}
              borderWidth={1}
              backgroundColor={'green'}>
              <AntDesign
                name={'pushpin'}
                style={{
                  fontSize: 20,
                  paddingHorizontal: 10,
                  color: 'white',
                }}
              />
            </AwesomeButton>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <FlatList
            key="@"
            horizontal
            data={phonetics}
            renderItem={renderPhonetic}
            contentContainerStyle={{}}
            ItemSeparatorComponent={() => (
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.phonetics}> </Text>
              </View>
            )}
            // ListFooterComponent={
            //   <Text style={[styles.phonetics, {paddingTop: 5}]}>.</Text>
            // }
          />
        </View>
        <FlatList
          key="!"
          showsHorizontalScrollIndicator={false}
          data={meanings}
          horizontal
          renderItem={renderPartOfSpeech}
          contentContainerStyle={{
            paddingTop: 10,
           // backgroundColor: 'red',
          }}
          // ItemSeparatorComponent={() => (
          //   <View style={{justifyContent: 'center'}}>
          //     <Text style={styles.phonetics}>, </Text>
          //   </View>
          // )}
        />

        <View style={{paddingTop: 10}}>
          <Text style={styles.header}>DEFINITIONS</Text>
          <FlatList
            key="$"
            //showsHorizontalScrollIndicator={false}
            data={meanings[activeIndex].definitions}
            renderItem={renderDefinitions}
            //contentContainerStyle={{paddingTop: 10}}
            // ItemSeparatorComponent={() => (
            //   <View style={{justifyContent: 'center'}}>
            //     <Text style={styles.phonetics}>, </Text>
            //   </View>
            // )}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexDirection: 'row', width: '100%'}}>
            <FlatList
              key="%"
              data={synonyms}
              ListHeaderComponent={<Text style={styles.header}>SYNONYMS</Text>}
              renderItem={renderSynonyms}
              contentContainerStyle={{paddingTop: 10, width: '100%'}}
              ListEmptyComponent={
                <Text
                  style={[
                    styles.text,
                    {color: 'black', fontFamily: 'Nunito-Medium'},
                  ]}>
                  None
                </Text>
              }
            />
            <FlatList
              key="^"
              data={antonyms}
              ListHeaderComponent={<Text style={styles.header}>ANTONYMS</Text>}
              renderItem={renderAntonyms}
              ListEmptyComponent={
                <Text
                  style={[
                    styles.text,
                    {color: 'black', fontFamily: 'Nunito-Medium'},
                  ]}>
                  None
                </Text>
              }
              contentContainerStyle={{
                paddingTop: 10,
                width: '100%',
              }}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default WordDetailScreen;

const styles = StyleSheet.create({
  phonetics: {
    fontFamily: 'Nunito-Bold',
    color: 'green',
    fontSize: 20,
  },
  header: {
    fontFamily: 'Nunito-Black',
    fontSize: 18,
    color: 'black',
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
  },
});
