import {StyleSheet, Text, View, Image} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import React from 'react';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation-fullscreen';
import Entypo from 'react-native-vector-icons/Entypo';

const PinWordDetailWordScreen = ({route}) => {
  const {data} = route.params;
  const {
    word,
    type,
    definition,
    pronunciation,
    meaning,
    example,
    exampleMeaning,
    wordUri,
  } = data;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
        <CubeNavigationHorizontal
          loop
          ref={view => {
            this.cube = view;
          }}>
          {/*FIRST CARD*/}
          <View
            style={[
              styles.card,
              {
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderColor: 'gold',
              },
            ]}>
            <Image
              style={styles.image}
              source={{uri: wordUri + ''}}
              //source={wordUri}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Nunito-Black',
                  fontSize: 20,
                  textAlign: 'left',
                }}>
                ({type})
              </Text>
            </View>

            <Text
              style={[
                styles.text,
                {fontFamily: 'Nunito-Medium', fontSize: 17},
              ]}>
              {definition}
            </Text>
          </View>
          {/*SECOND CARD*/}
          <View
            style={[
              styles.card,
              {
                backgroundColor: 'rgba(30, 144, 255,0.1)',
                borderColor: 'dodgerblue',
              },
            ]}>
            <Image
              style={styles.image}
              source={{uri: wordUri + ''}}

              //source={wordUri}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
              }}>
              <AwesomeButton
                springRelease
                activeOpacity={0.8}
                height={35}
                width={35}
                //onPress={() => Auth.login(contUser, contPass)}
                backgroundDarker={'darkgreen'}
                borderColor={'darkgreen'}
                borderWidth={1}
                backgroundColor={'green'}>
                <Entypo name="sound" style={{fontSize: 20, color: 'white'}} />
              </AwesomeButton>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.text,
                  {fontFamily: 'Nunito-Bold', fontSize: 17},
                ]}>
                {pronunciation}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: 'Nunito-Black',
                    fontSize: 20,
                    textAlign: 'left',
                    paddingRight: 5,
                  },
                ]}>
                ({type})
              </Text>
              <Text
                style={[
                  styles.text,
                  {fontFamily: 'Nunito-Medium', fontSize: 17},
                ]}>
                {meaning}
              </Text>
            </View>
          </View>
          {/*THIRD CARD*/}
          <View
            style={[
              styles.card,
              {
                backgroundColor: 'rgba(0, 128, 0, 0.1)',
                borderColor: 'green',
              },
            ]}>
            <Image
              style={styles.image}
              //source={{uri: wordUri}}
              source={wordUri}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingBottom: 10,
              }}>
              <AwesomeButton
                springRelease
                activeOpacity={0.8}
                height={35}
                width={35}
                //onPress={() => Auth.login(contUser, contPass)}
                backgroundDarker={'darkgreen'}
                borderColor={'darkgreen'}
                borderWidth={1}
                backgroundColor={'green'}>
                <Entypo name="sound" style={{fontSize: 20, color: 'white'}} />
              </AwesomeButton>
              <Text
                style={{
                  fontFamily: 'Nunito-Black',
                  fontSize: 20,
                  width: '80%',
                  textAlign: 'left',
                }}>
                {example}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.9,
                borderStyle: 'dashed',
                width: '80%',
              }}
            />
            <Text
              style={[
                styles.text,
                {
                  fontFamily: 'Nunito-Medium',
                  fontSize: 17,
                  width: '90%',
                },
              ]}>
              {exampleMeaning}
            </Text>
          </View>
        </CubeNavigationHorizontal>
      </View>
    </View>
  );
};

export default PinWordDetailWordScreen;

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    width: '100%',
    //marginLeft: parseInt(width * 0.1),
    height: 'auto',
  },
  card: {
    borderRadius: 10,
    borderBottomWidth: 7,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerComponents: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  image: {
    height: '30%',
    width: '30%',
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    paddingTop: 10,
  },
  neutralInput: {
    height: 55,
    width: '60%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'dodgerblue',
    borderTopColor: 'dodgerblue',
  },
  correctInput: {
    height: 55,
    width: '60%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'green',
    borderTopColor: 'green',
  },
  incorrectInput: {
    height: 55,
    width: '60%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'red',
    borderTopColor: 'red',
  },
  inputStyle: {fontSize: 16, paddingLeft: 10},
  incorrectLabelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    borderRadius: 10,
    fontFamily: 'Nunito-Black',
    color: 'red',
    elevation: 2,
  },
  correctLabelStyle: {
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
  },
  neutralLabelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    borderRadius: 10,
    fontFamily: 'Nunito-Black',
    color: 'dodgerblue',
    elevation: 2,
  },
  neutralPlaceholderStyle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
    color: 'dodgerblue',
  },
  incorrectPlaceholderStyle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
    color: 'red',
  },
  correctPlaceholderStyle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
    color: 'green',
  },
  textErrorStyle: {fontSize: 16},
});
