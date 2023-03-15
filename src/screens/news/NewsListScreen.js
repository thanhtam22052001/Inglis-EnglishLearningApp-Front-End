import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewsArticlePanel from '../../components/panels/NewsArticlePanel';
import {getPopularArticlesByPeriod, searchArticles} from '../../network/server';

const NewsListScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!route.params.isSearch) {
      setData(route.params?.contents);
    } else {
      searchArticles(route.params.searchQuery)
        .then(res => {
          setData(res);
          console.log(res);
        })
        .catch(console.error);
    }
  }, []);
  const renderPanels = ({item, index}) => (
    <NewsArticlePanel
      content={item}
      isSearch={route.params.isSearch}
      onPress={() => {
        navigation.push('NewsDetailScreen', {
          data: item,
        });
      }}
    />
  );
  return data ? (
    <FlatList
      key="!"
      showsHorizontalScrollIndicator={false}
      data={data}
      vertical
      renderItem={renderPanels}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'white',
        flexGrow: 1,
      }}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
    />
  ) : (
    <View style={{flex: 1}}>
      <ActivityIndicator />
    </View>
  );
};

export default NewsListScreen;
