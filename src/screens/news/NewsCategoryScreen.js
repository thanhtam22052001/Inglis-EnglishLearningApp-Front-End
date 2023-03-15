import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SearchBar} from 'react-native-elements';
import {CATEGORIES} from '../../services/constants';
import NewsCategoryListItem from '../../components/listItems/NewsCategoryListItem';
import NewsArticleItem from '../../components/listItems/NewsArticleItem';
import {
  getAllArticlesByCategory,
  getPopularArticlesByPeriod,
} from '../../network/server';
import {DATA} from './testData';
import NewsArticlePanel from '../../components/panels/NewsArticlePanel';

const NewsCategoryScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [categoryData, setCategoryData] = useState([]);
  const [popularData, setPopularData] = useState([]);
  const flatListRef = useRef(null);
  const renderCategories = ({item, index}) => (
    <NewsCategoryListItem
      content={item}
      onPress={() => {
        setCategory(CATEGORIES[index]);
        setActiveIndex(index);
        flatListRef?.current?.scrollToIndex({animated: true, index: 0});
      }}
      active={activeIndex === index}
    />
  );
  const renderArticles = ({item, index}) => (
    <NewsArticleItem
      content={item}
      // onPress={() => {
      //   navigation.push('NewsDetailScreen', {data: item});
      // }}
    />
  );

  useEffect(() => {
    getAllArticlesByCategory(category).then(res => {
      setCategoryData(res);
    });

    //setCategoryData(DATA);
  }, [category]);
  useEffect(() => {
    getPopularArticlesByPeriod(1)
      .then(res => {
        //console.log(res);
        setPopularData(res);
      })
      .catch(console.error);
    //setPopularData(DATA);
  }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
      }}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{}}>
        <SearchBar
          lightTheme
          onChangeText={setSearchQuery}
          onSubmitEditing={e => {
            navigation.push('NewsListScreen', {
              isSearch: true,
              searchQuery: e.nativeEvent.text,
            });
          }}
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
            paddingHorizontal: 20,
          }}
        />
        <FlatList
          key="!"
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          ref={flatListRef}
          horizontal
          renderItem={renderCategories}
          contentContainerStyle={{
            paddingTop: 10,
            paddingLeft: 20,
          }}
          ItemSeparatorComponent={() => <View style={{width: 5}} />}
        />
        <FlatList
          key="@"
          showsHorizontalScrollIndicator={false}
          data={categoryData}
          horizontal
          renderItem={renderArticles}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingLeft: 20,
          }}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
        />
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-Black',
                fontSize: 20,
                color: 'black',
              }}>
              Recommendations
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.push('NewsListScreen', {
                  isSearch: false,
                  contents: popularData,
                });
              }}>
              <Text
                style={{fontFamily: 'Nunito-ExtraBold', color: 'dodgerblue'}}>
                See More
              </Text>
            </TouchableOpacity>
          </View>
          {popularData && popularData[0] && (
            <NewsArticlePanel
              content={popularData[0]}
              onPress={() => {
                navigation.push('NewsDetailScreen', {data: popularData[0]});
              }}
            />
          )}
          <View height={13} />
          {popularData && popularData[1] && (
            <NewsArticlePanel
              content={popularData[1]}
              onPress={() => {
                navigation.push('NewsDetailScreen', {data: popularData[1]});
              }}
            />
          )}
          <View height={13} />
          {popularData && popularData[2] && (
            <NewsArticlePanel
              content={popularData[2]}
              onPress={() => {
                navigation.push('NewsDetailScreen', {data: popularData[2]});
              }}
            />
          )}
          <View height={13} />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewsCategoryScreen;
