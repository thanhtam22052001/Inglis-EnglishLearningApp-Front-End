import React from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button-fixed/src/themes/rick';
import {texts, colors} from '../../styles';
import LottieView from 'lottie-react-native';
const {width, height} = Dimensions.get('window');
const slides = [
  {
    id: '1',
    image: require('../../assets/lottie/onboarding/astronaut-stars.json'),
    title: 'Giao Diện Thân Thiện',
    subtitle:
      'Inglis được thiết kế thân thiện, thuận tiện với các thao tác của người dùng!',
  },
  {
    id: '2',
    image: require('../../assets/lottie/onboarding/astronaut-reads-book.json'),
    title: 'Khoá Học Đa Dạng',
    subtitle:
      'Inglis cung cấp đa dạng các khoá học phù hợp với nhiều trình độ của các học viên!',
  },
  {
    id: '3',
    image: require('../../assets/lottie/onboarding/astronaut-uses-laptop-happy.json'),
    title: 'Từ Vựng Phong Phú',
    subtitle:
      'Inglis mang lại kho từ vựng phong phú với nhiều cách tiếp cận khác nhau!',
  },
  {
    id: '4',
    image: require('../../assets/lottie/onboarding/astronaut-rocket.json'),
    title: 'Phương Pháp Học Mới Mẻ',
    subtitle:
      'Một khoá học có đến 3 chế độ khác nhau để học sẽ không khiến bạn thấy chán khi học nữa!',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center', width: width}}>
      <LottieView
        source={item?.image}
        autoPlay
        loop
        style={{
          height: '75%',
          //width,
          aspectRatio: 1,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <View>
        <Text style={[texts.title, {fontFamily: 'iCielPacifico'}]}>
          {item?.title}
        </Text>
        <Text style={texts.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                texts.indicator,
                currentSlideIndex == index && {
                  backgroundColor: colors.black,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View flexDirection="row" style={{height: 50}}>
              <AwesomeButtonRick
                springRelease
                type="primary"
                onPress={() => navigation.push('SignInScreen')}
                backgroundDarker={'darkgreen'}
                backgroundColor={'green'}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Nunito-Black',
                    width: '100%',
                    color: 'white',
                    fontSize: 15,
                  }}>
                  BẮT ĐẦU THÔI NÀO!
                </Text>
              </AwesomeButtonRick>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <AwesomeButtonRick
                springRelease
                activeOpacity={0.8}
                onPress={skip}
                backgroundColor={'white'}
                borderColor={'darkgreen'}
                borderWidth={1}
                backgroundDarker={'darkgreen'}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Nunito-Black',
                    width: '100%',
                    fontSize: 15,
                    color: 'darkgreen',
                  }}>
                  BỎ QUA
                </Text>
              </AwesomeButtonRick>
              <View style={{width: 15}} />
              <AwesomeButtonRick
                springRelease
                activeOpacity={0.8}
                onPress={goToNextSlide}
                backgroundDarker={'darkgreen'}
                backgroundColor={'green'}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Nunito-Black',
                    width: '100%',
                    fontSize: 15,
                    color: colors.white,
                  }}>
                  TIẾP TỤC
                </Text>
              </AwesomeButtonRick>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};
export default OnboardingScreen;
