import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import StudentListItem from '../../components/listItems/StudentListItem';
import {getUser_ByID, get_List_Rank} from '../../network/server';
// Hiện max 20 người, bên BE xử lí cái này
const DATAA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
    level: 'C2',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
    level: 'C1',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
    level: 'B2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    name: 'Fourth Item',
    level: 'B1',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    name: 'Lê Trần Bảo Lộc',
    level: 'A2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d54',
    name: 'Sixth Item',
    level: 'A1',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d53',
    name: 'Seventh Item',
    level: 'A0',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d533',
    name: 'Seventh Item',
    level: 'A0',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e229d53',
    name: 'Seventh Item',
    level: 'A0',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455721e29d53',
    name: 'Seventh Item',
    level: 'A0',
  },
];
// const getUserTest_ByID = async () => {
//   try {
//     let response = await fetch(
//       'https://api.dictionaryapi.dev/api/v2/entries/en/hello',
//       {
//         method: 'GET',
//         //Request Type
//       },
//     );
//     let responseJson = await response.json();
//     console.log(responseJson.result + 'hiihi');
//     return responseJson.result;
//   } catch (error) {
//     console.error(error);
//   }
// };
//http://192.168.252.177:3000/rank`
const userNotTested = {name: 'Lê Thành Tâm'};
const userTested = {name: 'Lê Trần Bảo Lộc', level: 'A1'};
const RankScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [level, setLevel] = useState();

  useEffect(() => {
    getUser_ByID(auth().currentUser.uid).then(res => {
      setName(res[0].Name);
      setLevel(res[0].Rank);
    });
    setName(userNotTested.name);
    setLevel(userNotTested.level);
    // getUserTest_ByID();
    get_List_Rank().then(res => {
      setData(res);
    });
    setData(DATAA);
  }, []);
  const renderItem = ({item, index}) => (
    <StudentListItem
      rankNum={index + 1}
      name={item.name}
      level={item.level}
      /*Ở đây sẽ thực hiện tìm xem user có trong list không, miễn sao trả về true nếu tìm dc user*/ isUser={
        name === item.name
      }
    />
  );
  const getLevel = userLevel => {
    const index =
      ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(userLevel) + 1;
    const normLevel = [
      require('../../assets/images/ranks/A0.png'),
      require('../../assets/images/ranks/A1.png'),
      require('../../assets/images/ranks/A2.png'),
      require('../../assets/images/ranks/B1.png'),
      require('../../assets/images/ranks/B2.png'),
      require('../../assets/images/ranks/C1.png'),
      require('../../assets/images/ranks/C2.png'),
    ];
    const disLevel = [
      require('../../assets/images/ranks/A0Dis.png'),
      require('../../assets/images/ranks/A1Dis.png'),
      require('../../assets/images/ranks/A2Dis.png'),
      require('../../assets/images/ranks/B1Dis.png'),
      require('../../assets/images/ranks/B2Dis.png'),
      require('../../assets/images/ranks/C1Dis.png'),
      require('../../assets/images/ranks/C2Dis.png'),
    ];
    return normLevel.slice(0, index).concat(disLevel.slice(index));
  };
  const header = userLevel => (
    <View>
      <View height={10} style={{backckgroundColor: 'white'}} />
      <View
        style={{
          marginBottom: 15,
          //marginTop: 10,
          marginHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingTop: 10,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/AdBannerImageForDebug.png')}
            style={{width: 40, height: 40, borderRadius: 40}}
          />
          <View width={10} />
          <Text style={{fontFamily: 'Nunito-Black', color: 'darkgreen'}}>
            {name}
          </Text>
        </View>
        {userLevel === '' ? (
          <View
            style={{
              alignSelf: 'center',
              paddingBottom: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-Black',
                fontSize: 20,
                color: 'black',
                paddingBottom: 5,
              }}>
              Chưa xác định
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito-Medium',
                //fontSize: 20,
                color: 'black',
                paddingHorizontal: 22,
                textAlign: 'center',
                paddingBottom: 7,
              }}>
              Hãy làm bài kiểm tra trình độ để Inglis giúp bạn xác định lộ trình
              học tiếng Anh phù hợp nhất bạn nhé!
            </Text>
            <View style={{flexDirection: 'row', width: '30%', height: 50}}>
              <AwesomeButton
                springRelease
                stretch
                height={50}
                borderRadius={20}
                backgroundColor="green"
                backgroundDarker="darkgreen"
                borderWidth={1}
                onPress={() => {
                  Alert.alert('KIỂM TRA', 'Bạn có muốn làm bài kiểm tra?', [
                    {
                      text: 'Không',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'Có',
                      onPress: () => {
                        navigation.push('ExamNavigator', {
                          screen: 'ExamStartScreen',
                          params: {
                            courseId: 'C001',
                            title: 'Bài kiểm tra trình độ',
                            titleEnglish: 'Mock Exam',
                            rules:
                              'Kiểm tra trình độ hiện tại của bạn.&Cố hết sức nào !!!.',
                            // phần này chèn content vào, content này là array các từ để thi
                            // content: ...
                            totalTime: 3,
                          },
                        });
                      },
                    },
                  ]);
                }}
                borderColor="darkgreen">
                <Text style={{color: 'white', fontFamily: 'Nunito-Black'}}>
                  KIỂM TRA
                </Text>
              </AwesomeButton>
            </View>
          </View>
        ) : (
          <View style={{alignSelf: 'center', paddingBottom: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '70%',
              }}>
              <Image
                source={getLevel(userLevel)[0]}
                style={{width: 60, height: 60}}
              />
              <Image
                source={getLevel(userLevel)[1]}
                style={{width: 60, height: 60}}
              />
              <Image
                source={getLevel(userLevel)[2]}
                style={{width: 60, height: 60}}
              />
              <Image
                source={getLevel(userLevel)[3]}
                style={{width: 60, height: 60}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-evenly',
                width: '50%',
              }}>
              <Image
                source={getLevel(userLevel)[4]}
                style={{width: 60, height: 60}}
              />
              <Image
                source={getLevel(userLevel)[5]}
                style={{width: 60, height: 60}}
              />
              <Image
                source={getLevel(userLevel)[6]}
                style={{width: 60, height: 60}}
              />
            </View>
          </View>
        )}
        <View
          style={{
            paddingVertical: 5,
          }}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              color: 'darkgreen',
              paddingVertical: 5,
              fontFamily: 'Nunito-Black',
              fontSize: 20,
            }}>
            BẢNG XẾP HẠNG
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        contentContainerStyle={{backgroundColor: 'white'}}
        stickyHeaderIndices={[0]}
        //removeClippedSubviews={true}
        ListHeaderComponent={header(level)}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={<View height={55} />}
      />
    </View>
  );
};

export default RankScreen;
