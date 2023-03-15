import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const ForgotPasswordSuccessModal = props => {
  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      transparent
      // onRequestClose={props.setModalVisible}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          autoPlay
          loop={false}
          duration={props.duration}
          source={require('../../assets/lottie/emailSent.json')}
          style={{width: '100%', alignSelf: 'center', height: '50%'}}
        />
      </View>
    </Modal>
  );
};

export default ForgotPasswordSuccessModal;

const styles = StyleSheet.create({});
