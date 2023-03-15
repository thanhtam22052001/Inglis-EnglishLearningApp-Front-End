import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApplicationNavigator from './src/navigation/Application';
import SplashScreen from 'react-native-lottie-splash-screen';
const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    }
    fetchData();
    //TODO: Disable this when finalizing product
    //AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);
  useEffect(() => {
    SplashScreen.hide(); // here
  }, []);
  return (
    isAppFirstLaunched != null && (
      <ApplicationNavigator isAppFirstLaunched={isAppFirstLaunched} />
    )
  );
};

export default App;
