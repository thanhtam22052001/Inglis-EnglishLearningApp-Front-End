import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {ProgressBar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get('window');

const LessonProgressBarHeader = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerLeft} onPress={props.onPress}>
        <Ionicons name="close" style={styles.iconHeaderLeft} />
      </TouchableOpacity>
      <View paddingLeft={10} paddingRight={10} flex={1}>
        <ProgressBar
          color={'green'}
          style={styles.progressBar}
          progress={props.progress}
        />
      </View>
      <View style={styles.indicatorContainer}>
        <Text style={[styles.indicator, {fontSize: 20}]}>
          {props.currentWordId}
        </Text>
        <Text style={[styles.indicator, {paddingBottom: 2}]}>/</Text>
        <Text style={styles.indicator}>{props.maxNumWords}</Text>
      </View>
    </View>
  );
};

export default LessonProgressBarHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 100,
  },
  progressBar: {
    height: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  iconHeaderLeft: {
    fontSize: 40,
    color: 'grey',
  },
  headerLeft: {
    marginLeft: 10,
    width: '10%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    paddingRight: 20,
    width: 59,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  indicator: {
    fontFamily: 'Nunito-Black',
  },
});
