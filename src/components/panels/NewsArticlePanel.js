import {View, Text, Linking} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {TouchableRipple} from 'react-native-paper';
import {getAgo} from '../../services/momentService';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const NewsArticlePanel = props => {
  const sleep = async timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const openLink = async url => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#008000',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#006400',
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
          openLink(props.isSearch ? props.content.web_url : props.content.url);
        }}
        borderless
        style={{
          borderRadius: 10,
          backgroundColor: 'white',
          height: 100,
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            style={{
              height: '95%',
              marginLeft: 2,
              aspectRatio: 1,
              borderRadius: 10,
            }}
            source={{
              uri: props.isSearch
                ? props.content.multimedia.length != 0
                  ? 'https://static01.nyt.com/' +
                    props.content.multimedia[0].url
                  : 'https://www.bgsu.edu/content/dam/BGSU/libraries/images/CAC/collections/cac-sentinel-1891.jpg'
                : props.content.media.length != 0 &&
                  props.content.media[0]['media-metadata'].length != 0
                ? props.content.media[0]['media-metadata'][0].url
                : 'https://www.bgsu.edu/content/dam/BGSU/libraries/images/CAC/collections/cac-sentinel-1891.jpg',
            }}
          />
          <View style={{paddingHorizontal: 10, flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  letterSpacing: 3,
                  fontFamily: 'Nunito-ExtraBold',
                  fontSize: 10,
                  paddingBottom: 20,
                }}>
                {props.isSearch
                  ? (props.content.section_name || 'others').toUpperCase()
                  : props.content.section.toUpperCase()}
              </Text>
              <Text style={{fontFamily: 'Nunito-Bold', fontSize: 10}}>
                {getAgo(
                  props.isSearch
                    ? props.content.pub_date
                    : props.content.published_date,
                )}
              </Text>
            </View>

            <Text
              numberOfLines={2}
              style={{
                fontFamily: 'Nunito-Black',
                fontSize: 13,
              }}>
              {props.isSearch ? props.content.abstract : props.content.title}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default NewsArticlePanel;
