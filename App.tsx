import * as React from 'react';
import { AppLoading } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Image,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import AppTabsScreen from './screens/AppTabsScreen';
import defaultStyles from './styles';

const App = () => {
  const [isReady, setReady] = React.useState(false);

  const updateAsync = async () => {
    await sleep(2000);
    SplashScreen.hideAsync();
    setReady(true);
  };

  const sleep = (sec) => {
    return new Promise((resolve) => {
      setTimeout(resolve, sec);
    });
  };

  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!isReady) {
    return (
      <View style={[defaultStyles.container]}>
        <Image
          resizeMode="contain"
          style={{ width: '100%' }}
          source={require('./assets/splash.png')}
          onLoad={updateAsync}
        />
      </View>
    );
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <AppTabsScreen />
          <SafeAreaView style={{ backgroundColor: '#442c2e' }} />
        </KeyboardAvoidingView>
      </NavigationContainer>
    );
  }
};

export default App;
