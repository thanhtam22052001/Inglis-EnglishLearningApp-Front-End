import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import LearningCategoryCard from '../buttons/LearningCategoryCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
const LessonTypeChoicesModal = props => {
  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      transparent={true}
      onRequestClose={props.setModalVisible}>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={props.setModalVisible}
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            justifyContent: 'center',
            paddingVertical: 10,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            // borderWidth: 5,
            // borderColor: 'forestgreen',
            margin: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity onPress={props.setModalVisible}>
              <AntDesign
                name="closecircle"
                style={{fontSize: 25, color: 'green', paddingRight: 10}}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.lessonName}>{props.lessonName}</Text>
          <Text style={styles.text}>Bạn hãy lựa chọn 1 hình thức học: </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              height: 190,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LearningCategoryCard
              text={'SUY ĐOÁN'}
              type={'SD'}
              textBackground={'#00C5F9'}
              backgroundColor={'#fff'}
              borderColor={'#1899D6'}
              textColor={'#fff'}
              onPress={props.onPressSD}
            />
            <View style={{width: 15}} />
            <LearningCategoryCard
              text={'GÕ TỪ'}
              type={'GT'}
              textBackground={'#ff6868'}
              backgroundColor={'#fff'}
              borderColor={'#EA2B2B'}
              textColor={'#fff'}
              onPress={props.onPressGT}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              width: '95%',
              height: 190,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LearningCategoryCard
              text={'PHÁT ÂM'}
              type={'STT'}
              textBackground={'#cdc302'}
              backgroundColor={'#fff'}
              borderColor={'#e99e18'}
              textColor={'#fff'}
              onPress={props.onPressSTT}
            />
            <View style={{width: 15}} />
            <LearningCategoryCard
              text={'FLASHCARD'}
              type={'FC'}
              textBackground={'#00CB7E'}
              backgroundColor={'#fff'}
              borderColor={'#00A868'}
              textColor={'#fff'}
              onPress={props.onPressFC}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              height: 190,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LearningCategoryCard
              text={'ĐỊNH NGHĨA'}
              type={'GM'}
              textBackground={'green'}
              backgroundColor={'#fff'}
              borderColor={'darkgreen'}
              textColor={'#fff'}
              onPress={props.onPressGM}
            />
            <View style={{width: 15}} />
            <LearningCategoryCard
              text={'ĐIỀN TỪ'}
              type={'ST'}
              textBackground={'#0A556E'}
              backgroundColor={'#fff'}
              borderColor={'#073b4c'}
              textColor={'#fff'}
              onPress={props.onPressST}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default LessonTypeChoicesModal;

const styles = StyleSheet.create({
  text: {fontSize: 16, fontFamily: 'Nunito-Medium', paddingBottom: 10},
  lessonName: {
    fontSize: 20,
    fontFamily: 'Nunito-Black',
    paddingBottom: 10,
    color: 'green',
    textAlign: 'center',
  },
});
