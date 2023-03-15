import Tts from 'react-native-tts';

const speech_word = word => {
  // Tts.speak(word);
  // console.log('aloooo');
  // // Tts.speak(word, {
  // //   androidParams: {
  // //     KEY_PARAM_PAN: -1,
  // //     KEY_PARAM_VOLUME: 0.5,
  // //     KEY_PARAM_STREAM: 'STREAM_MUSIC',
  // //   },
  // // });
  // Tts.getInitStatus().then(() => {
  //   Tts.speak('Hello, world!');
  // });

  Tts.getInitStatus()
    .then(() => {
      Tts.setDefaultLanguage('en-IE');
      Tts.setDefaultVoice('com.apple.ttsbundle.Yuna-compact');
      Tts.setDefaultRate(1, true);
      Tts.speak(word);
    })
    .catch(err => {
      if (err.code === 'no_engine') {
        // Tts.requestInstallEngine();
        console.log(err);
      }
    });
};
export {speech_word};
