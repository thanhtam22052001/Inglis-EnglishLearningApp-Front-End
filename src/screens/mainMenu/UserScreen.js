import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StatisticPanel from '../../components/panels/StatisticPanel';
import {
  getUser_ByID,
  get_CourseDone,
  get_List_Rank,
  get_WordDoneAndRank,
} from '../../network/server';
import {containers} from '../../styles';
import Auth from './../../services/authService';

const getIndexRank = (res, uid) => {
  var i;
  for (i = 0; i < res.length; i++) if (res[i].id == uid) return i + 1;
};
const UserScreen = ({navigation}) => {
  const [username, setUserName] = useState();
  const [timesignup, setTimeSignup] = useState();
  const [coursedone, setCourseDone] = useState([]);
  const [worddone, setWordDone] = useState();
  const [level, setLevel] = useState('A1');
  const [rank, setRank] = useState(1);

  useEffect(() => {
    console.log(auth().currentUser.displayName);
    if (auth().currentUser.displayName != null) {
      setUserName(auth().currentUser.displayName);
    } else {
      getUser_ByID(auth().currentUser.uid).then(res => {
        setUserName(res[0].Name);
        setTimeSignup(res[0].Time);
      });
    }
    // setUserName('Le Tran Bao Loc');
    // setTimeSignup('Tháng 6, 2022');

    get_CourseDone(auth().currentUser.uid).then(res => {
      setCourseDone(res);
    });
    get_WordDoneAndRank(auth().currentUser.uid).then(res => {
      setWordDone(res[0].numWords || 0);
      setLevel(res[0].level || 'A1');
    });
    get_List_Rank().then(res => {
      setRank(getIndexRank(res, auth().currentUser.uid));
    });
  }, []);
  return (
    <ScrollView
      style={containers.scrollViewContainer}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={{height: 100, width: '90%', marginVertical: 10}}>
        <AwesomeButton
          height={100}
          borderRadius={20}
          width={null}
          stretch
          backgroundColor="green"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.push('ProfileDetailScreen', {onPressSave: () => {}});
          }}>
          <View
            style={{
              flexDirection: 'column',
              paddingLeft: 10,
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={[styles.title, {color: 'white'}]}>{username}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5
                name="clock"
                style={{fontSize: 10, color: 'white'}}
              />
              <View width={5} />
              <Text style={[styles.joinDate, {color: 'white'}]}>
                Đã tham gia vào {timesignup}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="edit" style={{fontSize: 10, color: 'white'}} />
              <Text style={[styles.joinDate, {color: 'white', fontSize: 10}]}>
                {' '}
                Nhấp vào để chỉnh sửa hồ sơ của bạn.
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={require('../../assets/images/AdBannerImageForDebug.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
                borderWidth: 2,
                borderColor: 'white',
                marginRight: 10,
              }}
            />
            {/* <View
            style={{
              borderRadius: 50,
              backgroundColor: 'white',
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: -10,
              right: -10,
              borderWidth: 1,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Entypo name="edit" style={{fontSize: 15, color: 'black'}} />
            </TouchableOpacity>
          </View> */}
          </View>
        </AwesomeButton>
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '90%',
        }}>
        <Text style={[styles.title, {width: '100%', textAlign: 'left'}]}>
          Statistics
        </Text>
        <View height={10} />
        <View
          style={{
            height: 160,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <StatisticPanel
              name={'Khoá học đã học'}
              value={coursedone.length}
              type={'XP'}
            />
            <StatisticPanel name={'Cấp độ'} value={level} type={level} />
          </View>
          <View height={13} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <StatisticPanel
              name={'Số từ đã học'}
              value={worddone}
              type={'WORD'}
            />
            <StatisticPanel name={'Xếp hạng'} value={rank} type={'RANK'} />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '90%',
        }}>
        <Text
          style={[
            styles.title,
            {width: '100%', textAlign: 'left', paddingBottom: 10},
          ]}>
          Others
        </Text>
        <AwesomeButton
          height={50}
          borderRadius={20}
          width={null}
          stretch
          backgroundColor="green"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.push('PrivacyPolicyScreen');
          }}>
          <Text style={[styles.title, {color: 'white'}]}>
            CHÍNH SÁCH BẢO MẬT
          </Text>
        </AwesomeButton>
        <View height={10} />
        <AwesomeButton
          height={50}
          borderRadius={20}
          width={null}
          stretch
          backgroundColor="green"
          borderColor="darkgreen"
          borderWidth={1}
          backgroundDarker="darkgreen"
          onPress={() => {
            navigation.push('TermsConditionsScreen');
          }}>
          <Text style={[styles.title, {color: 'white'}]}>
            ĐIỀU KHOẢN & DỊCH VỤ
          </Text>
        </AwesomeButton>
        <View height={10} />
        <AwesomeButton
          height={50}
          borderRadius={20}
          width={null}
          stretch
          backgroundColor="white"
          borderColor="red"
          borderWidth={1}
          backgroundDarker="red"
          onPress={() => {
            Alert.alert('ĐĂNG XUẤT', 'Bạn có muốn đăng xuất?', [
              {
                text: 'Không',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Có',
                onPress: () => {
                  // Thực hiện add vào db
                  Auth.logout();
                },
              },
            ]);
          }}>
          <Text style={[styles.title, {color: 'red'}]}>ĐĂNG XUẤT</Text>
        </AwesomeButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: 'Nunito-Black',
  },
  email: {color: 'grey', fontSize: 12, fontFamily: 'Nunito-Medium'},
  joinDate: {fontFamily: 'Nunito-Medium'},
});
export default UserScreen;
