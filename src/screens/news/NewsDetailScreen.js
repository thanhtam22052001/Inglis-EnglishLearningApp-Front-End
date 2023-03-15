import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {CATEGORIES_EMOJI} from '../../services/constants';
import {SvgUri} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import {getAgo} from '../../services/momentService';

const NewsDetailScreen = ({route}) => {
  let {data} = route.params;
  useEffect(() => {
    console.log(JSON.stringify(data, null, 2));
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
        <Text
          style={{
            width: '100%',
            fontFamily: 'Nunito-ExtraBold',
            color: 'black',
            letterSpacing: 3,
            fontSize: 17,
          }}>
          {CATEGORIES_EMOJI[data.section]}
          {data.section.toUpperCase()}
        </Text>
        <Text
          style={{
            fontFamily: 'Nunito-ExtraBold',
            color: 'black',
            fontSize: 17,
            width: '100%',
            // backgroundColor: 'red',
          }}>
          {data.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //justifyContent: 'space-between',
            width: '100%',
          }}>
          <View style={{flexDirection: 'row'}}>
            <SvgUri />
            <Text>{data.byline}</Text>
          </View>
          <Text></Text>
          <Text style={{fontSize: 25}}>•</Text>
          <Text>{getAgo(data.published_date)}</Text>
        </View>
        <FastImage
          style={{width: '100%', aspectRatio: 3 / 2, borderRadius: 10}}
          source={{uri: data.multimedia[0].url}}
        />
        <Text></Text>
      </View>
    </View>
  );
};

export default NewsDetailScreen;
