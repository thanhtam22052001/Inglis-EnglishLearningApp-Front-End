import {AvatarGenerator} from 'random-avatar-generator';
import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions, Text, View, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableRipple} from 'react-native-paper';
import {SvgUri} from 'react-native-svg';
import {getAgo} from '../../services/momentService';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewsArticleItem = props => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [timeAgo, setTimeAgo] = useState('');
  const generator = useMemo(() => new AvatarGenerator(), []);
  useEffect(() => {
    setTimeAgo(getAgo(props.content.published_date));
    setAvatarUrl(generator.generateRandomAvatar(props.content.byline));
  }, []);
  const sleep = async timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const openLink = async url => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        await sleep(800);
        //Alert.alert(JSON.stringify(result));
      } else Linking.openURL(url);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
      }}>
      <TouchableRipple
        onPress={() => {
          openLink(props.content.url);
        }}
        borderless
        style={{
          borderRadius: 10,
          backgroundColor: 'white',
          height: windowHeight / 2.5,
          width: windowWidth / 1.4,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <FastImage
            style={{
              flex: 1,
              borderRadius: 10,
              //maxHeight: windowHeight / 4,
              margin: 10,
            }}
            source={{uri: props.content.multimedia[0].url}}
          />
          <Text
            style={{
              letterSpacing: 3,
              fontFamily: 'Nunito-ExtraBold',
              paddingLeft: 10,
            }}>
            {props.content.section.toUpperCase()}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              paddingHorizontal: 10,
              fontFamily: 'Nunito-Black',
              color: 'black',
            }}>
            {props.content.title}
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 10,
              paddingTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SvgUri height={50} width={50} uri={avatarUrl} />
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Nunito-Bold',
                  paddingLeft: 5,
                  color: 'black',
                  width: 90,
                }}>
                {props.content.byline.substring(3)}
              </Text>
            </View>
            <Text style={{fontSize: 25}}>•</Text>
            <Text style={{fontFamily: 'Nunito-Bold'}}>{timeAgo}</Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default NewsArticleItem;
