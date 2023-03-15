import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {CATEGORIES_EMOJI} from '../../services/constants';

const NewsCategoryListItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'dodgerblue',
        height: 50,
        backgroundColor: props.active ? 'dodgerblue' : 'white',
      }}>
      <Text
        style={{
          paddingHorizontal: 10,
          fontFamily: 'Nunito-Black',
          color: props.active ? 'white' : 'black',
          //backgroundColor: props.active ? 'white' : 'white',
        }}>
        {CATEGORIES_EMOJI[props.content]} {props.content}
      </Text>
    </TouchableOpacity>
  );
};

export default NewsCategoryListItem;
