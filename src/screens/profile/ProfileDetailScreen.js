import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-element-textinput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {Keyboard} from 'react-native';
import {getUser_ByID, updateUser} from '../../network/server';
import auth from '@react-native-firebase/auth';
const ProfileDetailScreen = ({navigation}) => {
  // const user = {
  //   name: 'Lê Trần Bảo Lộc',
  //   email: 'baoloc7401@gmail.com',
  //   phoneNum: '0353156465',
  //   career: 'Học sinh',
  //   password: '1',
  // };
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNum: '',
    career: '',
    //password: '1',
  });

  const [contName, setContName] = useState('');
  const [contEmail, setContEmail] = useState('');
  const [contPhoneNum, setContPhoneNum] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  //const [contOldPassword, setContOldPassword] = useState('');
  const [contNewPassword, setContNewPassword] = useState('');
  const [contConfirmNewPassword, setContConfirmNewPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const onChangePicker = val => {
    //setValue(state => state.slice(0, state.length - 1));
    setValue(val);
  };

  useEffect(() => {
    getUser_ByID(auth().currentUser.uid).then(res => {
      console.log(res);
      setContName(res[0].Name);
      setContEmail(res[0].Email);
      setContPhoneNum(res[0].Phone);
      setValue(res[0].Job);
    });
    navigation.setParams({
      onPressSave: () => {
        console.log('gvgff');
        //updateUser(contName, contPhoneNum, value, auth().currentUser.uid);
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
      },
    });
  }, []);
  const [itemsFilter, setItemsFilter] = useState([
    {
      label: 'Học sinh',
      value: 'Student',
      icon: () => (
        <Image
          source={require('../../assets/images/primaryStudent.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Sinh viên',
      value: 'CollegeStudent',
      icon: () => (
        <Image
          source={require('../../assets/images/collegeStudent.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Giáo viên',
      value: 'Teacher',
      icon: () => (
        <Image
          source={require('../../assets/images/teacher.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Người đi làm',
      value: 'Working',
      icon: () => (
        <Image
          source={require('../../assets/images/adult.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Khác',
      value: 'Other',
      icon: () => (
        <Image
          source={require('../../assets/images/others.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
  ]);
  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
        backgroundColor: 'white',
      }}>
      <View style={{backgroundColor: 'white', width: '90%'}}>
        <Text style={[styles.title, {fontSize: 19, paddingBottom: 10}]}>
          Thông tin cá nhân
        </Text>
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
          <Image
            source={require('../../assets/images/AdBannerImageForDebug.png')}
            style={{width: 80, height: 80, borderRadius: 80}}
          />
          <TouchableOpacity>
            <Text style={[styles.title, {color: 'dodgerblue'}]}>
              Thay đổi ảnh đại diện
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={contName}
          style={styles.textInput}
          inputStyle={styles.input}
          labelStyle={styles.label}
          placeholderStyle={styles.placeholder}
          textErrorStyle={{fontSize: 16}}
          label="Họ và tên"
          placeholder="eg. Lê Văn Mười"
          placeholderTextColor="gray"
          onChangeText={text => {
            setContName(text);
          }}
        />
        <TextInput
          value={contEmail}
          style={styles.textInput}
          inputStyle={styles.input}
          labelStyle={styles.label}
          editable={false}
          renderRightIcon={() => <></>}
          selectTextOnFocus={false}
          placeholderStyle={styles.placeholder}
          textErrorStyle={{fontSize: 16}}
          label="Email"
          placeholder="eg. muoilv@gmail.com"
          placeholderTextColor="gray"
          onSubmitEditing={() => phoneNum.current.focus()}
        />
        <TextInput
          value={contPhoneNum}
          style={styles.textInput}
          inputStyle={styles.input}
          labelStyle={styles.label}
          placeholderStyle={styles.placeholder}
          textErrorStyle={{fontSize: 16}}
          label="Số điện thoại"
          placeholder="eg. 0123456789"
          placeholderTextColor="gray"
          maxLength={10}
          keyboardType="numeric"
          onChangeText={text => {
            setContPhoneNum(text);
          }}
        />
        <View
          style={{
            justifiyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <DropDownPicker
            open={open}
            value={value}
            items={itemsFilter}
            listMode="SCROLLVIEW"
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItemsFilter}
            onChangeValue={val => {
              onChangePicker(val);
            }}
            placeholder="Nghề nghiệp"
            style={{
              width: '100%',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'green',
            }}
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            textStyle={{
              fontSize: 15,
              fontFamily: 'Nunito-Medium',
            }}
            labelStyle={{
              fontFamily: 'Nunito-Black',
              textAlign: 'center',
              fontSize: 20,
            }}
            maxHeight={290}
            dropDownContainerStyle={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'green',
            }}
          />
        </View>
        {/* <Text style={[styles.title, {fontSize: 19}]}>Đổi mật khẩu</Text>
        <Text style={{fontFamily: 'Nunito-Medium'}}>
          {changePassword === false
            ? 'Nhập mật khẩu cũ, bấm "xong" trên bàn phím để đổi mật khẩu mới'
            : 'Bạn hãy nhập mật khẩu mới và xác nhận mật khẩu để được đổi mật khẩu mới nhé!'}
        </Text>
         {changePassword === false ? (
          <TextInput
            value={contOldPassword}
            style={styles.textInput}
            inputStyle={[styles.input]}
            labelStyle={styles.label}
            placeholderStyle={styles.placeholder}
            textErrorStyle={{fontSize: 16}}
            secureTextEntry
            label="Mật khẩu cũ"
            onChangeText={text => {
              setContOldPassword(text);
            }}
            onSubmitEditing={event => {
              if (event.nativeEvent.text === user.password) {
                setChangePassword(true);
              } else ToastAndroid.show('Sai mật khẩu!', ToastAndroid.SHORT);
            }}
          />
        ) : ( 
        <View>
          <TextInput
            value={contNewPassword}
            style={styles.textInput}
            inputStyle={[styles.input]}
            labelStyle={styles.label}
            placeholderStyle={styles.placeholder}
            textErrorStyle={{fontSize: 16}}
            secureTextEntry
            label="Mật khẩu mới"
            onChangeText={text => {
              setContNewPassword(text);
            }}
          />
          <TextInput
            value={contConfirmNewPassword}
            style={styles.textInput}
            inputStyle={[styles.input]}
            labelStyle={styles.label}
            placeholderStyle={styles.placeholder}
            textErrorStyle={{fontSize: 16}}
            secureTextEntry
            label="Xác nhận mật khẩu mới"
            onChangeText={text => {
              setContConfirmNewPassword(text);
            }}
            onSubmitEditing={() => {
              if (contConfirmNewPassword === contNewPassword)
                Alert.alert('Đã đổi mật khẩu');
              else
                ToastAndroid.show(
                  'Xác nhận mật khẩu khác mật khẩu mới.',
                  ToastAndroid.SHORT,
                );
            }}
            // onSubmitEditing={event => {
            //   if (event.nativeEvent.text === DATA[0]) {
            //     setChangePassword(true);
            //   }
            // }}
          />
        </View> */}
      </View>
    </ScrollView>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nunito-Black',
    marginTop: 10,
  },
  textInput: {
    marginTop: 15,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'green',
    borderTopColor: 'green',
  },
  input: {
    fontSize: 16,
    paddingLeft: 10,
  },
  label: {
    fontSize: 14,
    position: 'absolute',
    top: -12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    borderRadius: 10,
    fontFamily: 'Nunito-Black',
    color: 'green',
    elevation: 2,
  },
  placeholder: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
    color: 'green',
  },
});
