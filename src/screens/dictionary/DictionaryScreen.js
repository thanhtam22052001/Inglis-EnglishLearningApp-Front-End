import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SearchBar } from 'react-native-elements';

const DictionaryScreen = ({navigation}) => {
  const DATA_RECENTLY = [
    {
      word: 'laugh',
      phonetic: '/laːf/',
      phonetics: [
        {
          text: '/laːf/',
          audio: '',
        },
        {
          text: '/lɑːf/',
          audio: '',
        },
        {
          text: '/læf/',
          audio:
            'https://api.dictionaryapi.dev/media/pronunciations/en/laugh-us.mp3',
          sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=275476',
        },
      ],
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition:
                'An expression of mirth particular to the human species; the sound heard in laughing; laughter.',
              synonyms: [],
              antonyms: [],
              example: 'His deep laughs boomed through the room.',
            },
            {
              definition: 'Something that provokes mirth or scorn.',
              synonyms: [],
              antonyms: [],
              example: "Your new hat's an absolute laugh, dude.",
            },
            {
              definition: 'A fun person.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [
            'cachinnation',
            'cackle',
            'chortle',
            'chuckle',
            'giggle',
            'guffaw',
            'snicker',
            'snigger',
            'titter',
            'joke',
            'laughing stock',
          ],
          antonyms: [],
        },
        {
          partOfSpeech: 'verb',
          definitions: [
            {
              definition:
                'To show mirth, satisfaction, or derision, by peculiar movement of the muscles of the face, particularly of the mouth, causing a lighting up of the face and eyes, and usually accompanied by the emission of explosive or chuckling sounds from the chest and throat; to indulge in laughter.',
              synonyms: [],
              antonyms: [],
              example:
                'There were many laughing children running on the school grounds.',
            },
            {
              definition:
                'To be or appear cheerful, pleasant, mirthful, lively, or brilliant; to sparkle; to sport.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                '(followed by "at") To make an object of laughter or ridicule; to make fun of; to deride; to mock.',
              synonyms: [],
              antonyms: [],
              example: "Don't laugh at my new hat, man!",
            },
            {
              definition:
                'To affect or influence by means of laughter or ridicule.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition: 'To express by, or utter with, laughter.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [
            'cackle',
            'chortle',
            'chuckle',
            'giggle',
            'guffaw',
            'snicker',
            'snigger',
            'titter',
          ],
          antonyms: ['cry', 'weep'],
        },
      ],
    },
    {
      word: 'what',
      phonetic: '/wɔt/',
      phonetics: [
        {
          text: '/wɔt/',
          audio: '',
        },
        {
          text: '/wʌt/',
          audio: '',
        },
      ],
      meanings: [
        {
          partOfSpeech: 'adverb',
          definitions: [
            {
              definition:
                '(Singlish) Used to contradict an underlying assumption held by the interlocutor.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition: 'Something; thing; stuff.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                'The identity of a thing, as an answer to a question of what.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                'Something that is addressed by what, as opposed to a person, addressed by who.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: 'adverb',
          definitions: [
            {
              definition:
                '(usually followed by "with," but also sometimes "would" or "might," especially in finance) In some manner or degree; in part; partly. See also what with',
              synonyms: [],
              antonyms: [],
              example:
                'The market will calculate these higher risks in their funding costs what might result in higher lending rates.',
            },
            {
              definition: 'Such.',
              synonyms: [],
              antonyms: [],
              example: 'What a beautiful day!',
            },
            {
              definition: 'Why.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                'Used to introduce each of two coordinate phrases or concepts; both…and.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: ['such'],
          antonyms: [],
        },
        {
          partOfSpeech: 'pronoun',
          definitions: [
            {
              definition:
                '(interrogative) Which thing, event, circumstance, etc.: used interrogatively in asking for the specification of an identity, quantity, quality, etc.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition: 'That which; those that; the thing that.',
              synonyms: [],
              antonyms: [],
              example: 'He knows what he wants.',
            },
            {
              definition: '(relative) That; which; who.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition: 'Whatever.',
              synonyms: [],
              antonyms: [],
              example: 'I will do what I can to help you.',
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: 'interjection',
          definitions: [
            {
              definition: 'An expression of surprise or disbelief.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                'What do you want? An abrupt, usually unfriendly enquiry as to what a person desires.',
              synonyms: [],
              antonyms: [],
              example: "What? I'm busy.",
            },
            {
              definition: 'Clipping of what do you say?',
              synonyms: [],
              antonyms: [],
            },
            {
              definition: 'What did you say? I beg your pardon?',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                '(typically with a) An intensifier to an adjective phrase; used to begin a sentence.',
              synonyms: [],
              antonyms: [],
              example: 'What a nice car.',
            },
          ],
          synonyms: ['what-what', 'wot', 'come again', 'pardon'],
          antonyms: [],
        },
      ],
    },
    {
      word: 'hello',
      phonetics: [
        {
          audio:
            'https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3',
        },
        {
          text: '/həˈləʊ/',
          audio:
            'https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3',
        },
      ],
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition: '"Hello!" or an equivalent greeting.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: ['greeting'],
          antonyms: [],
        },
        {
          partOfSpeech: 'verb',
          definitions: [
            {
              definition: 'To greet with "hello".',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: 'interjection',
          definitions: [
            {
              definition:
                'A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.',
              synonyms: [],
              antonyms: [],
              example: 'Hello, everyone.',
            },
            {
              definition: 'A greeting used when answering the telephone.',
              synonyms: [],
              antonyms: [],
              example: 'Hello? How may I help you?',
            },
            {
              definition:
                'A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.',
              synonyms: [],
              antonyms: [],
              example: 'Hello? Is anyone there?',
            },
            {
              definition:
                'Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.',
              synonyms: [],
              antonyms: [],
              example:
                'You just tried to start your car with your cell phone. Hello?',
            },
            {
              definition: 'An expression of puzzlement or discovery.',
              synonyms: [],
              antonyms: [],
              example: 'Hello! What’s going on here?',
            },
          ],
          synonyms: [],
          antonyms: ['bye', 'goodbye'],
        },
      ],
    },
    {
      word: 'bye',
      phonetic: '/baɪ/',
      phonetics: [
        {
          text: '/baɪ/',
          audio:
            'https://api.dictionaryapi.dev/media/pronunciations/en/bye-au.mp3',
        },
        {
          text: '/baɪ/',
          audio:
            'https://api.dictionaryapi.dev/media/pronunciations/en/bye-us.mp3',
        },
      ],
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition:
                'The position of a person or team in a tournament or competition who draws no opponent in a particular round so advances to the next round unopposed, or is awarded points for a win in a league table; also the phantom opponent of such a person or team.',
              synonyms: [],
              antonyms: [],
              example: "Craig's Crew plays the bye next week.",
            },
            {
              definition:
                'An extra scored when the batsmen take runs after the ball has passed the striker without hitting either the bat or the batsman.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition: 'A dwelling.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                'A thing not directly aimed at; something which is a secondary object of regard; an object by the way, etc.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition: 'A pass.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
    },
    {
      word: 'dude',
      phonetics: [
        {
          audio:
            'https://api.dictionaryapi.dev/media/pronunciations/en/dude-au.mp3',
        },
        {
          text: '/duːd/',
          audio:
            'https://api.dictionaryapi.dev/media/pronunciations/en/dude-us.mp3',
        },
      ],
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition: 'A man, generally a younger man.',
              synonyms: [],
              antonyms: [],
              example:
                'So we were at the mall and these two dudes just walk up to us and say "hi".',
            },
            {
              definition:
                '(used in the vocative) A term of address for someone, typically a man, particularly when cautioning him or offering him advice.',
              synonyms: [],
              antonyms: [],
              example:
                "Dude, I'd be careful around the principal; he's having a bad day.",
            },
            {
              definition: 'An inexperienced cowboy.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition: 'A tourist.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                'A man who is very concerned about his dress and appearance; a dandy, a fop.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [
            'bloke',
            'chap',
            'cove',
            'guy',
            'dandy',
            'fop',
            'masher',
            'mate',
          ],
          antonyms: [],
        },
        {
          partOfSpeech: 'verb',
          definitions: [
            {
              definition: 'To address someone as dude.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition: 'To take a vacation in a dude ranch.',
              synonyms: [],
              antonyms: [],
            },
            {
              definition:
                'Usually followed by up: to dress up, to wear smart or special clothes.',
              synonyms: [],
              antonyms: [],
            },
          ],
          synonyms: [],
          antonyms: [],
        },
        {
          partOfSpeech: 'interjection',
          definitions: [
            {
              definition:
                'A term of address, usually for a man, conveying awe, excitement, surprise, etc.',
              synonyms: [],
              antonyms: [],
              example: 'Dude! You finally called!',
            },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
    },
  ];
  const DATA_RECENTLY2 = ['laugh', 'what', 'hello', 'bye', 'dude'];
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  const onChangeSearch = query => {
    setSearchQuery(query);

    //searchFilterFunction(value, query);
  };
  const renderItems = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.push('WordDetailScreen', {
          data: item,
        });
      }}>
      <Text
        style={{
          fontFamily: 'Nunito-Bold',
          fontSize: 17,
          color: 'dodgerblue',
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{width: '90%', paddingTop: 5, height: '100%'}}>
        <Text
          style={{fontFamily: 'Nunito-Black', fontSize: 45, color: 'green'}}>
          TỪ ĐIỂN
        </Text>

        <SearchBar
          lightTheme
          onChangeText={value => onChangeSearch(value)}
          value={searchQuery}
          platform={'android'}
          inputContainerStyle={{
            borderWidth: 1,
            backgroundColor: '#fff',
            borderColor: 'green',
            borderBottomColor: 'green',
            borderBottomWidth: 1,
            borderRadius: 5,
          }}
          fontSize={15}
          fontFamily="Nunito-Medium"
          placeholder="Tìm kiếm từ bạn mong muốn"
          containerStyle={{
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            width: '100%',
          }}
          onSubmitEditing={event => {
            navigation.push('WordDetailScreen', {
              data: searchQuery,
            });
          }}
        />
        <Text
          style={{
            fontFamily: 'Nunito-Black',
            fontSize: 18,
            color: 'green',
          }}>
          Tìm kiếm gần đây
        </Text>
        <FlatList
          style={{
            backgroundColor: 'white',
            maxHeight: 445,
            //minHeight: 300,
          }}
          data={DATA_RECENTLY2}
          renderItem={renderItems}
          keyExtractor={(item, index) => item + index}
          contentContainerStyle={{flexGrow: 1}}
          // ListEmptyComponent={
          //   <ListEmptyComponent
          //     title={'Danh sách các khoá học hiện tại trống!'}
          //     description={
          //       'Hãy cùng bắt đầu hành trình chinh phục tiếng Anh của mình bằng cách học những khoá học được đề xuất ở dưới nhé!'
          //     }
          //   />
          // }
        />
      </View>
    </View>
  );
};

export default DictionaryScreen;

const styles = StyleSheet.create({});
