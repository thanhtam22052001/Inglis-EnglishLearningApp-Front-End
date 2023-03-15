import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
const PinWordWordListItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onPressWord}
      style={{
        flexDirection: 'row',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        alignItems: 'center',
      }}>
      <Image
        source={{uri: props.wordUri + ''}}
        style={{width: 70, height: 70, borderRadius: 10}}
      />
      <View style={{width: '79%', paddingLeft: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Black', fontSize: 17}}>
            {props.word}
          </Text>
          <Text style={{fontFamily: 'Nunito-Medium', paddingTop: 2}}>
            {' '}
            ({props.type})
          </Text>
        </View>
        <Text style={{fontFamily: 'Nunito-Bold'}}>{props.meaning}</Text>
        <Text numberOfLines={1} style={{fontFamily: 'Nunito-Medium'}}>
          {props.definition}
        </Text>
      </View>
      <View style={{width: '11%'}}>
        <AwesomeButton
          springRelease
          activeOpacity={0.8}
          height={35}
          width={35}
          onPress={props.onPressSound}
          backgroundDarker={'darkgreen'}
          borderColor={'darkgreen'}
          borderWidth={1}
          backgroundColor={'white'}>
          <Entypo name="sound" style={{fontSize: 20, color: 'green'}} />
        </AwesomeButton>
      </View>
    </TouchableOpacity>
  );
};

export default PinWordWordListItem;

const styles = StyleSheet.create({});
