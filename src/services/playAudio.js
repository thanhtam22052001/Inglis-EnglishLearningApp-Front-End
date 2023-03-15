import Sound from 'react-native-sound';
import correct from '../audio/correct-audio.mp3';
import wrong from '../audio/wrong-audio.mp3';

Sound.setCategory('Playback');

var dingcorrect = new Sound(correct, Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      dingcorrect.getDuration() +
      'number of channels: ' +
      dingcorrect.getNumberOfChannels(),
  );
});

var dingwrong = new Sound(wrong, Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      dingwrong.getDuration() +
      'number of channels: ' +
      dingwrong.getNumberOfChannels(),
  );
});

const playCorrectAudio = () => {
  dingcorrect.stop();
  dingcorrect.setVolume(1);
  dingcorrect.play(success => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};

const playWrongAudio = () => {
  dingwrong.stop();
  dingwrong.setVolume(1);
  dingwrong.play(success => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};

export {playCorrectAudio, playWrongAudio};
