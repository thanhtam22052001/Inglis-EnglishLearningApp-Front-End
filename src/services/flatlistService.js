import {FlatList, Text} from 'react-native';
import React from 'react';
const renderItem = ({item}, symbol) => (
  <Text
    style={{
      color: 'black',
      paddingHorizontal: 10,
      fontFamily: 'Nunito-Medium',
      color: 'black',
      textAlign: 'justify',
    }}>
    {symbol + ' '}
    {item.text}
  </Text>
);
export const setInformationInData = (text, symbol) => {
  if (symbol === undefined) {
    symbol = '\u2B24';
  }
  let DATA = [];
  let i = 0;
  text.split('&').forEach(element => {
    DATA.push({id: i, text: element});
    i++;
  });
  return (
    <FlatList
      style={{flexGrow: 0}}
      contentContainerStyle={{
        backgroundColor: 'transparent',
        paddingBottom: 10,
        flexGrow: 0,
      }}
      data={
        DATA[0].text == ''
          ? (DATA = [{id: 0, text: 'Không có nội dung.'}])
          : DATA
      }
      renderItem={item => renderItem(item, symbol)}
      keyExtractor={item => item.id}
      nestedScrollEnabled
    />
  );
};
