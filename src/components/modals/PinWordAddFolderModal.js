import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-element-textinput';
import AwesomeButton from 'react-native-really-awesome-button-fixed';

const PinWordAddFolderModal = props => {
  const [contWord, setContWord] = useState('');
  // Ý tưởng là bấm tạo thư mục sẽ lưu vào server, truyền thêm giá trị boolean, nếu true, thì sau khi đóng cái modal này, màn hình chứa các thư mục pinword ở ngoài sẽ reset state để cập nhật, còn false thì khỏi
  const saveFolder = () => {
    // contWord là tên của thư mục
    // Xử lí save
    if (contWord !== '') {
      props.setModalVisible(true, contWord);
      setContWord('');
    }
  };
  const deleteFolder = () => {
    props.setModalVisible(null, '');
  }
  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      transparent={true}
      onRequestClose={() => props.setModalVisible(false, '')}>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => props.setModalVisible(false, '')}
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
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-Black',
                color: 'black',
                fontSize: 20,
              }}>
              {props.actionType === 'add'
                ? 'TẠO THƯ MỤC MỚI'
                : 'CHỈNH SỬA THƯ MỤC'}
            </Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 0, top: 0}}
              onPress={props.setModalVisible}>
              <AntDesign
                name="closecircle"
                style={{fontSize: 25, color: 'green', paddingRight: 10}}
              />
            </TouchableOpacity>
            <View style={{width: '90%', paddingTop: 10}}>
              <TextInput
                value={contWord}
                style={{
                  height: 50,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: 'green',
                  borderTopColor: 'green',
                }}
                inputStyle={{
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                labelStyle={{
                  fontSize: 14,
                  position: 'absolute',
                  top: -12,
                  backgroundColor: 'white',
                  paddingHorizontal: 4,
                  marginLeft: -4,
                  borderRadius: 10,
                  fontFamily: 'Nunito-Black',
                  color: 'green',
                  elevation: 2,
                }}
                placeholderStyle={{
                  fontSize: 16,
                  fontFamily: 'Nunito-Bold',
                  paddingLeft: 10,
                  color: 'green',
                }}
                maxLength={30}
                textErrorStyle={{fontSize: 16}}
                label="Nhập tên thư mục"
                placeholder="eg. Chủ đề Xe cộ"
                placeholderTextColor="gray"
                onChangeText={text => {
                  setContWord(text);
                }}
              />
              <Text style={{paddingVertical: 10, fontFamily: 'Nunito-Medium'}}>
                (Tối đa 30 ký tự)
              </Text>
              {props.actionType !== 'add' ? (
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    paddingBottom: 10,
                    marginTop: 5,
                  }}>
                  <AwesomeButton
                    springRelease
                    height={50}
                    width={175}
                    borderWidth={1}
                    borderColor={'darkred'}
                    onPress={deleteFolder}
                    backgroundDarker={'darkred'}
                    backgroundColor={'red'}>
                    <Text
                      style={{
                        padding: 10,
                        fontFamily: 'Nunito-Black',
                        fontSize: 15,
                        color: 'white',
                      }}>
                      XOÁ THƯ MỤC
                    </Text>
                  </AwesomeButton>
                </View>
              ) : (
                <View />
              )}
              <View style={{width: '100%', height: 50}}>
                <AwesomeButton
                  springRelease
                  height={50}
                  width={175}
                  borderWidth={1}
                  borderColor={'darkgreen'}
                  onPress={saveFolder}
                  backgroundDarker={'darkgreen'}
                  backgroundColor={'green'}>
                  <Text
                    style={{
                      padding: 10,
                      fontFamily: 'Nunito-Black',
                      fontSize: 15,
                      color: 'white',
                    }}>
                    {props.actionType === 'add'
                      ? 'TẠO THƯ MỤC MỚI'
                      : 'ĐỔI TÊN THƯ MỤC'}
                  </Text>
                </AwesomeButton>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default PinWordAddFolderModal;

const styles = StyleSheet.create({});
