import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {Provider} from 'react-native-paper';
import CourseHorizontalButton from '../../components/buttons/CourseHorButton';
import CourseVerticalButton from '../../components/buttons/CourseVertButton';
import ListEmptyComponent from '../../components/listComponents/ListEmptyComponent';
import {get_LearedCourse, get_RecommendCourse} from '../../network/server';
import {containers, texts} from '../../styles';

const HomeScreen = ({navigation}) => {
  const [finddata, setFindData] = useState([]);
  const [data, setData] = useState(DATA);
  const [redata, setReData] = useState([
    {
      id: '',
      title: '',
      numLessonDone: 1,
      level: '',
      desciption: '',
      source: '',
    },
    {
      id: '',
      title: '',
      numLessonDone: 1,
      level: '',
      desciption: '',
      source: '',
    },
  ]);
  const [alldata, setAllData] = useState([]);

  useEffect(() => {
    get_LearedCourse(auth().currentUser.uid).then(res => {
      setData(res);
      // console.log(res);
    });
    get_RecommendCourse(auth().currentUser.uid).then(res => {
      setReData(res);
      //console.log(res);
    });
    get_RecommendCourse().then(res => {
      setAllData(res);
      setFindData(res);
      // console.log(res);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
    searchFilterFunction(value, query);
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const onChangePicker = val => {
    //setValue(state => state.slice(0, state.length - 1));
    if (val === 'Clear') {
      setValue(null);
      searchFilterFunction(null, searchQuery);
    } else {
      setValue(val);
      searchFilterFunction(val, searchQuery);
    }
  };
  const [itemsFilter, setItemsFilter] = useState([
    {
      label: 'Mặc định',
      value: 'Clear',
      icon: () => (
        <Image
          source={require('../../assets/images/clearFilter.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Starter (A0)',
      value: 'A0',
      icon: () => (
        <Image
          source={require('../../assets/images/ranks/A0.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Elementary (A1)',
      value: 'A1',
      icon: () => (
        <Image
          source={require('../../assets/images/ranks/A1.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Pre-intermediate (A2)',
      value: 'A2',
      icon: () => (
        <Image
          source={require('../../assets/images/ranks/A2.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Intermediate (B1)',
      value: 'B1',
      icon: () => (
        <Image
          source={require('../../assets/images/ranks/B1.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Upper-intermediate (B2)',
      value: 'B2',
      icon: () => (
        <Image
          source={require('../../assets/images/ranks/B2.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Advanced (C1)',
      value: 'C1',
      icon: () => (
        <Image
          source={require('../../assets/images/ranks/C1.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Proficient (C2)',
      value: 'C2',
      icon: () => (
        <Image
          source={require('../../assets/images/ranks/C2.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
  ]);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      numLessonDone: 1,
      numLesson: 10,
      level: 'A1',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: true,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      numLessonDone: 1,

      numLesson: 30,
      level: 'A1',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: true,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      numLessonDone: 1,

      numLesson: 50,
      level: 'A2',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: true,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Fourth Item',
      numLessonDone: 1,

      numLesson: 10,
      level: 'C1',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: true,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: 'Fifth Item',
      numLessonDone: 1,

      numLesson: 60,
      level: 'B1',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: true,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d54',
      title: 'Sixth Item',
      numLessonDone: 1,

      numLesson: 50,
      level: 'B2',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: true,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d53',
      title: 'Seventh Item',
      numLessonDone: 1,

      numLesson: 1,
      level: 'A1',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: false,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d78',
      title: 'Eighth Item',
      numLessonDone: 1,

      numLesson: 1,
      level: 'C2',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: false,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d10',
      title: 'Ninth Item',
      numLessonDone: 1,

      numLesson: 1,
      level: 'A1',
      desciption:
        "LET'S GO là sản phẩm đầu tay của hệ thống INGLIS, gồm 7 chủ đề học từ vựng tiếng Anh thông dụng",
      source: require('../../assets/images/AdBannerImageForDebug.png'),
      recentlyLearned: false,
    },
  ];

  const renderItemVertical = ({item, index}) => (
    <CourseVerticalButton
      title={item.title}
      source={item.source}
      numLesson={item.numLesson}
      level={item.level}
      description={item.desciption}
      onPress={() => {
        navigation.push('LessonNavigator', {
          screen: 'CourseScreen',
          params: {
            courseId: item.id,
            title: item.title,
          },
        });
      }}
    />
  );
  const renderItemHorizontal = ({item, index}) => (
    <CourseHorizontalButton
      height={100}
      width={'100%'}
      color={'#1899D6'}
      title={item.title}
      level={item.level}
      progress={item.numLessonDone / item.numLesson}
      source={item.source}
      onPress={() => {
        navigation.push('LessonNavigator', {
          screen: 'CourseScreen',
          params: {
            courseId: item.id,
            title: item.title,
          },
        });
      }}
    />
  );
  const searchFilterFunction = (pickerVal, text) => {
    const newData = alldata
      .filter(e => {
        const itemDataTitle = e.title.toLowerCase();
        const searchText = text ?? '';
        const textDataSearch = searchText.toLowerCase();
        return text == '' ? true : itemDataTitle.indexOf(textDataSearch) > -1;
      })
      .filter(e => {
        const itemDataLevel = e.level;
        return pickerVal != null ? itemDataLevel === pickerVal : true;
      });
    //console.log(newData);
    //console.log(text);
    //console.log(pickerVal);
    setFindData(newData);
    //console.log(finddata);
  };
  const recentlyLearned = DATA.filter(e => e.recentlyLearned == true);
  if (finddata != [])
    return (
      <Provider>
        <ScrollView
          style={containers.scrollViewContainer}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          stickyHeaderIndices={data != [] ? [1, 4, 8] : [4, 8]}
          nestedScrollEnabled>
          <View height={data != [] ? 10 : 0} />
          {data != [] ? (
            <View style={styles.sectionContainer}>
              <Text style={styles.headers}> Khoá học hiện tại của bạn </Text>
            </View>
          ) : (
            <View />
          )}
          {data != [] ? (
            <View style={{width: '90%', maxHeight: 530}}>
              <FlatList
                key={'@'}
                style={{
                  backgroundColor: 'white',
                  maxHeight: 445,
                  paddingTop: 10,
                  //minHeight: 300,
                }}
                data={data}
                renderItem={renderItemHorizontal}
                keyExtractor={item => item.id}
                nestedScrollEnabled
                contentContainerStyle={{flexGrow: 1}}
                // ListEmptyComponent={
                //   <ListEmptyComponent
                //     title={'Danh sách các khoá học hiện tại trống!'}
                //     description={
                //       'Hãy cùng bắt đầu hành trình chinh phục tiếng Anh của mình bằng cách học những khoá học được đề xuất ở dưới nhé!'
                //     }
                //   />
                // }
                ListFooterComponent={<View height={20} />}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
              />
            </View>
          ) : (
            <View />
          )}

          <View height={10} />
          <View style={styles.sectionContainer}>
            <Text style={styles.headers}> Có thể phù hợp với bạn </Text>
          </View>
          <CourseHorizontalButton
            paddingTop={25}
            height={100}
            width={'90%'}
            color={'#1899D6'}
            title={redata[0].title}
            level={redata[0].level}
            progress={0}
            source={redata[0].source}
            onPress={() => {
              navigation.push('LessonNavigator', {
                screen: 'CourseScreen',
                params: {
                  courseId: redata[0].id,
                  title: redata[0].title,
                },
              });
            }}
          />
          <CourseHorizontalButton
            paddingTop={45}
            height={100}
            width={'90%'}
            color={'#1899D6'}
            title={redata[1].title}
            level={redata[1].level}
            progress={0}
            source={redata[1].source}
            onPress={() => {
              navigation.push('LessonNavigator', {
                screen: 'CourseScreen',
                params: {
                  courseId: redata[1].id,
                  title: redata[1].title,
                },
              });
            }}
          />
          <View height={20} />
          <View style={styles.sectionContainer}>
            <Text style={styles.headers}> Các khoá học từ vựng khác </Text>
            <View
              style={{
                justifiyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
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
                fontFamily={'Nunito-Medium'}
                placeholder={'Tìm kiếm'}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  width: '100%',
                  paddingHorizontal: 10,
                }}
              />
            </View>
            <View
              style={{
                justifiyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingBottom: 10,
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
                placeholder="Cấp độ"
                style={{width: '100%', borderRadius: 5, borderColor: 'green'}}
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
                  borderColor: 'green',
                }}
              />
            </View>
          </View>
          <View height={10} />
          <FlatList
            key={'#'}
            style={{backgroundColor: 'white', width: '90%', minHeight: 330}}
            data={finddata}
            renderItem={renderItemVertical}
            keyExtractor={item => item.id}
            columnWrapperStyle={{justifyContent: 'space-around'}}
            nestedScrollEnabled
            contentContainerStyle={{flexGrow: 1}}
            numColumns={2}
            ListEmptyComponent={
              <ListEmptyComponent
                title={'Danh sách khoá học trống!'}
                description={
                  'Chúng mình không tìm được khoá học mà bạn đã yêu cầu.'
                }
              />
            }
            ListFooterComponent={<View height={60} />}
            ItemSeparatorComponent={() => <View style={{height: 16}} />}
          />
        </ScrollView>
      </Provider>
    );
};
const styles = StyleSheet.create({
  headers: [texts.section, {paddingVertical: 5, fontFamily: 'Nunito-Black'}],
  sectionContainer: {
    backgroundColor: 'green',
    width: '90%',
    borderRadius: 9,
    justifyContent: 'center',
    elevation: 10,
  },
});
export default HomeScreen;
