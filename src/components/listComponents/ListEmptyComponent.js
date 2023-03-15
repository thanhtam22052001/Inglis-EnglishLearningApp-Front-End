import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ListEmptyComponent = props => {
  return (
    <View style={[styles.container, props.style ?? {}]}>
      <Image
        source={require('../../assets/images/ListEmpty.png')}
        style={styles.image}
      />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.desc}>{props.description}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center'},
  image: {width: 100, height: 100},
  title: {fontFamily: 'Nunito-Black', fontSize: 17},
  desc: {fontFamily: 'Nunito-Medium', width: '90%', textAlign: 'center'},
});
