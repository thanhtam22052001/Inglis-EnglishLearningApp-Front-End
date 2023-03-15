import auth from '@react-native-firebase/auth';
import moment from 'moment';
import React, {useEffect, useReducer, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  SectionList,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListEmptyComponent from '../../components/listComponents/ListEmptyComponent';
import PinWordFolderListItem from '../../components/listItems/PinWordFolderListItem';
import PinWordAddFolderModal from '../../components/modals/PinWordAddFolderModal';
import {
  deleteDetailFolder,
  deleteFolder,
  get_FolderExist,
  get_FolderExistByID,
  insert_newFolder,
  insert_WordFolder,
  updateNameWord,
  updateNumWord,
} from '../../network/server';
import {toSectionListData} from '../../services/sectionListDataService';
const DEVICE_HEIGHT = Dimensions.get('window').height;
// const DATA = [
//   {
//     id: 1,
//     name: 'First Item',
//     numWords: 10,
//     numWordsDone: 1,
//     updatedAt: '05 / 05 / 2022',
//     content: [],
//   },
//   {
//     id: 2,
//     name: 'Second Item',
//     numWords: 20,
//     numWordsDone: 3,
//     updatedAt: '05 / 05 / 2022',
//     content: [],
//   },
//   {
//     id: 3,
//     name: 'Third Item',
//     numWords: 10,
//     numWordsDone: 4,
//     updatedAt: '06 / 05 / 2022',
//     content: [],
//   },
//   {
//     id: 4,
//     name: 'Fourth Item',
//     numWords: 10,
//     numWordsDone: 5,
//     updatedAt: '06 / 05 / 2022',
//     content: [],
//   },
//   {
//     id: 5,
//     name: 'Fifth Item',
//     numWords: 20,
//     numWordsDone: 6,
//     content: [],

//     updatedAt: '05 / 06 / 2022',
//   },
//   {
//     id: 6,
//     name: 'Sixth Item',
//     numWords: 20,
//     numWordsDone: 7,
//     content: [],

//     updatedAt: '05 / 06 / 2022',
//   },
//   {
//     id: 7,
//     name: 'Seventh Item',
//     numWords: 1,
//     numWordsDone: 1,
//     content: [],

//     updatedAt: '06 / 06 / 2022',
//   },
//   {
//     id: 8,
//     name: 'Eighth Item',
//     numWords: 1,
//     numWordsDone: 1,
//     content: [],

//     updatedAt: '06 / 06 / 2022',
//   },
//   {
//     id: 9,
//     name: 'Ninth Item',
//     numWords: 1,
//     numWordsDone: 1,
//     content: [
//       {
//         id: '1',
//         word: 'Name',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition:
//           'A word or words that a particular person, animal, place or thing is known by',
//         meaning: 'Tên, tên gọi',
//         example: 'Hello everyone, my name is Tam tam tam tam tam tam tam tam',
//         exampleMeaning:
//           'Xin chào mọi người, tui tên là Tâm nha nha nha nha nha nha nha nha nha nha nha nha nha nha',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '2',
//         word: 'Hello',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition: 'A word to say when you meet someone',
//         meaning: 'Xin chào',
//         example: 'Hello my friends',
//         exampleMeaning: 'Xin chào bạn tui',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '3',
//         word: 'Wow',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition:
//           'A word or words that a particular person, animal, place or thing is known by',
//         meaning: 'Tên, tên gọi',
//         example: 'Hello everyone, my name is Tam tam tam tam tam tam tam tam',
//         exampleMeaning:
//           'Xin chào mọi người, tui tên là Tâm nha nha nha nha nha nha nha nha nha nha nha nha nha nha',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '4',
//         word: 'Hi',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition: 'A word to say when you meet someone',
//         meaning: 'Xin chào',
//         example: 'Hello my friends',
//         exampleMeaning: 'Xin chào bạn tui',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '5',
//         word: 'You',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition: 'A word to say when you meet someone',
//         meaning: 'Xin chào',
//         example: 'Hello my friends',
//         exampleMeaning: 'Xin chào bạn tui',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '6',
//         word: 'Hehe',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition: 'A word to say when you meet someone',
//         meaning: 'Xin chào',
//         example: 'Hello my friends',
//         exampleMeaning: 'Xin chào bạn tui',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '7',
//         word: 'We',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition: 'A word to say when you meet someone',
//         meaning: 'Xin chào',
//         example: 'Hello my friends',
//         exampleMeaning: 'Xin chào bạn tui',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '8',
//         word: 'They',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition: 'A word to say when you meet someone',
//         meaning: 'Xin chào',
//         example: 'Hello my friends',
//         exampleMeaning: 'Xin chào bạn tui',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '9',
//         word: 'Friends',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition: 'A word to say when you meet someone',
//         meaning: 'Xin chào',
//         example: 'Hello my friends',
//         exampleMeaning: 'Xin chào bạn tui',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//       {
//         id: '10',
//         word: 'What',
//         type: 'n',
//         pronunciation: '/neim/',
//         definition: 'A word to say when you meet someone',
//         meaning: 'Xin chào',
//         example: 'Hello my friends',
//         exampleMeaning: 'Xin chào bạn tui',
//         wordUri: require('../../assets/images/AdBannerImageForDebug.png'),
//       },
//     ],

//     updatedAt: '15 / 06 / 2022',
//   },
// ];
const DATA = [
  // {
  //   id: 1,
  //   name: 'First Item',
  //   numWords: 10,
  //   numWordsDone: 1,
  //   updatedAt: '05 / 05 / 2022',
  //   content: [],
  // },
];

const PinWordScreen = ({navigation, route}) => {
  // Dùng navigations bằng props.navigation, route
  //const {navigation, route} = props;
  const {isModal, wordData} = route.params;
  const {
    word,
    type,
    definition,
    pronunciation,
    meaning,
    example,
    exampleMeaning,
    wordUri,
  } = wordData;
  const [modalVisible, setModalVisible] = useState(false);
  const [numberFolder, setNumberFolder] = useState(0);
  const list = useRef(null);
  // Do dùng sectionlist nên data sẽ bị thay đổi để đúng với cấu trúc sectionlist, tuy nhiên phải giữ cấu trúc data cũ để thêm hoặc xoá
  const processedData = toSectionListData(DATA);
  const [isMounted, toggle] = useReducer(p => !p, true);
  const [data, setData] = useState(processedData);

  useEffect(() => {
    get_FolderExist().then(res => {
      if (res !== []) {
        setNumberFolder(res.length);

        get_FolderExistByID(auth().currentUser.uid).then(res2 => {
          if (res2 != []) {
            setData(toSectionListData(res2));
          }
        });
      }
    });
  }, []);
  // useEffect(()=>{
  //   if (dataChanged === true) {
  //     setData()
  //   }
  // },[dataChanged])
  // useEffect(() => {
  //   console.log(data);
  //   // if (data.length !== undefined) {
  //   //   list.current.scrollToLocation({
  //   //     animated: true,
  //   //     itemIndex: data[data?.length - 1]?.data?.length - 1,
  //   //     sectionIndex: data?.length - 1,
  //   //   });
  //   // }
  // }, [list.current]);
  const renderItem = ({item, index}) => (
    <PinWordFolderListItem
      name={item.name}
      numWords={item.numWords}
      progress={item.numWordsDone}
      onPress={() => {
        if (isModal === false)
          navigation.push('PinWordDetailScreen', {
            idFolder: item.id,
            folderName: item.name,
            //content: item.content,
          });
        else if (isModal === true) {
          Alert.alert('GHIM VÀO THƯ MỤC', 'Bạn có muốn từ vào thư mục này?', [
            {
              text: 'Không',
              onPress: () => ToastAndroid.show('Canceled', ToastAndroid.SHORT),
              style: 'cancel',
            },
            {
              text: 'Có',
              onPress: () => {
                // Thực hiện add vào db
                //Alert.alert(JSON.stringify(wordData));
                insert_WordFolder(item.id, wordData.id).then(res => {
                  updateNumWord(item.id);
                });
                ToastAndroid.show('Success', ToastAndroid.SHORT);
              },
            },
          ]);
        }
      }}
      onPressSettings={() => {
        setActionType('update');
        setChosenItemIndex(item.id);
        setModalVisible(!modalVisible);
      }}
    />
  );
  const sectionItem = title => {
    if (title === 'TODAY')
      return (
        <View style={{backgroundColor: 'green', padding: 10, borderRadius: 10}}>
          <Text style={{color: 'white', fontFamily: 'Nunito-Black'}}>
            {title}
          </Text>
        </View>
      );
    else
      return (
        <View
          style={{
            backgroundColor: 'lightgreen',
            padding: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'green',
          }}>
          <Text style={{color: 'green', fontFamily: 'Nunito-Black'}}>
            {title}
          </Text>
        </View>
      );
  };
  const [chosenItemIndex, setChosenItemIndex] = useState(-1);
  const [state, setState] = useState({activeIndex: 0});
  const [actionType, setActionType] = useState('add');

  const header = () => {
    return (
      <View
        backgroundColor={'white'}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[
            {flexDirection: 'row'},
            isModal === true ? {width: '100%'} : {width: '90%'},
          ]}>
          {isModal === true ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: '10%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons name="close" style={{fontSize: 40, color: 'grey'}} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <Text
            style={{
              padding: 10,
              fontFamily: 'Nunito-Black',
              color: 'grey',
              fontSize: 15,
            }}>
            Thư mục của bạn
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white'}}>
      {header()}
      <PinWordAddFolderModal
        modalVisible={modalVisible}
        actionType={actionType}
        setModalVisible={(confirm, folderName) => {
          setModalVisible(!modalVisible);
          if (confirm === true) {
            // getStateFilter(0);
            const today = moment().format('DD / MM / YYYY').toString();
            if (actionType === 'add') {
              // Những gì cần push lên server
              //      |
              //      V
              // rawData.push({
              //   id: rawData.length + 1,
              //   name: folderName,
              //   numWords: 0,
              //   numWordsDone: 0,
              //   updatedAt: today,
              insert_newFolder(
                'F00' +
                  (numberFolder + 1) +
                  '' +
                  Math.floor(Math.random() * 100),
                folderName,
                numberFolder + 1,
                auth().currentUser.uid,
                0,
                today,
              ).then(res => {
                get_FolderExistByID(auth().currentUser.uid).then(res => {
                  setData(toSectionListData(res));
                });
              });

              // });
              // const updatedData = toSectionListData(rawData);
              // Closing as not needed

              // list.current.scrollToLocation({
              //   itemIndex: data[data.length - 1].data.length,
              //   sectionIndex: data.length - 1,
              // });
            } else {
              // Đây là phần update, đổi tên thư mục
              // rawData[chosenItemIndex - 1].name = folderName;
              // const updatedData = toSectionListData(rawData);
              // Mỗi lần bấm vào nút Bánh Xe (Settings) thì sẽ đổi state ChosenItemIndex, tuỳ theo id trên server bắt đầu từ 0 or 1 mà -1 hay ko nha
              //setData(/*Ở đây update lại giao diện để fetch về những thay đổi nha*/);
              updateNameWord(folderName, chosenItemIndex).then(res => {
                get_FolderExistByID(auth().currentUser.uid).then(res => {
                  setData(toSectionListData(res));
                });
              });
            }
            ToastAndroid.show('Success', ToastAndroid.SHORT);
          } else if (confirm === null) {
            Alert.alert('XOÁ THƯ MỤC', 'Bạn có muốn xoá thư mục này', [
              {
                text: 'Không',
                onPress: () =>
                  ToastAndroid.show('Canceled', ToastAndroid.SHORT),
                style: 'cancel',
              },
              {
                text: 'Có',
                onPress: () => {
                  // Xoá
                  // rawData.splice(chosenItemIndex - 1, 1);
                  // const updatedData = toSectionListData(rawData);
                  // setData(updatedData);
                  deleteDetailFolder(chosenItemIndex).then(res => {
                    deleteFolder(chosenItemIndex).then(res2 => {
                      get_FolderExistByID(auth().currentUser.uid).then(res3 => {
                        setData(toSectionListData(res3));
                      });
                    });
                  });

                  ToastAndroid.show('Success', ToastAndroid.SHORT);
                },
              },
            ]);
          } else if (confirm === false)
            ToastAndroid.show('Canceled', ToastAndroid.SHORT);
        }}
      />
      {isMounted && (
        <SectionList
          initialNumToRender={30}
          // ref={list}
          style={{backgroundColor: 'white'}}
          //initialScrollIndex={data.length}
          initialScrollIndex={0}
          ListFooterComponent={
            isModal === true ? <View height={100} /> : <View height={150} />
          }
          // onScrollToIndexFailed={() => {
          //   const wait = new Promise(resolve => setTimeout(resolve, 500));
          //   wait.then(() => {
          //     list.current?.scrollToLocation({
          //       itemIndex: data[data.length - 1].data.length,
          //       sectionIndex: data.length - 1,
          //     });
          //   });
          // }}
          sections={data}
          //data={data}
          renderItem={renderItem}
          renderSectionFooter={({section: {title}}) => sectionItem(title)}
          keyExtractor={(item, index) => item + index}
          contentContainerStyle={{
            marginTop: -10,
            flexGrow: 1,
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'flex-end',
          }}
          //ItemSeparatorComponent={itemDivider}
          //SectionSeparatorComponent={itemDivider}
          ListEmptyComponent={
            <ListEmptyComponent
              title={'Danh sách thư mục trống!'}
              description={'Hãy tạo thêm thư mục để lưu thêm từ vựng nhé!'}
              // style={{transform: [{scaleY: -1}]}}
            />
          }
        />
      )}
      <View
        style={[
          {
            position: 'absolute',
            height: 65,
            width: '100%',
            backgroundColor: 'forestgreen',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopWidth: 5,
            borderTopColor: 'lightgreen',
          },
          isModal === true
            ? {top: DEVICE_HEIGHT - 55}
            : {top: DEVICE_HEIGHT - 165},
        ]}>
        <AwesomeButton
          springRelease
          type="primary"
          backgroundDarker={'darkgreen'}
          backgroundColor={'white'}
          width={150}
          height={40}
          borderRadius={10}
          onPress={() => {
            setActionType('add');
            setModalVisible(!modalVisible);
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Nunito-Black',
              color: 'green',
              fontSize: 15,
            }}>
            + Tạo thư mục mới
          </Text>
        </AwesomeButton>
        <View height={10} />
      </View>
    </View>
  );
};
export default PinWordScreen;
