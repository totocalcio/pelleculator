import * as React from 'react';
import { AppLoading,SplashScreen  } from 'expo';
import { KeyboardAvoidingView,SafeAreaView ,View,Image } from 'react-native';
import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import defaultStyles from './styles';

const AppTab = createBottomTabNavigator();

const AppTabsScreen = () => (
  <AppTab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#d9376e',
      inactiveTintColor: '#fedbd0',
      labelStyle: {
        fontSize: 12,
        fontFamily:'Inter_900Black'
      },
      style: {
        backgroundColor:'#442c2e',
        height:50,
      },
    }}
  >
    <AppTab.Screen
      name="Home"
      component={HomeScreen}
      options= {{
        tabBarIcon: props => (
          <MaterialCommunityIcons
            name={ props.focused ? 'home' : 'home-outline' }
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTab.Screen
      name="Profile"
      component={ProfileScreen}
      options= {{
        tabBarIcon: props => (
          <MaterialCommunityIcons
            name={ props.focused ? 'heart' : 'heart-outline' }
            size={props.size}
            color={props.color}
          />
        )
      }}
    />
  </AppTab.Navigator>
)

const App = () => {

  const [isReady,setReady] = React.useState(false);

  const updateAsync = async () => {
    await sleep(3000);
    SplashScreen.hide();
    setReady(true);
  }
  
  const sleep = (sec) => {
    return new Promise(resolve => {
        setTimeout(resolve, sec);
    })
  }
  
  React.useEffect(()=>{
    SplashScreen.preventAutoHide();
  },[]);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!isReady) {
    return (
      <View style={[defaultStyles.container]}>
        <Image
          resizeMode='contain'
          style={{width: "100%"}}
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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <AppTabsScreen />
          <SafeAreaView style={{backgroundColor:"#442c2e"}}/>
        </KeyboardAvoidingView>
      </NavigationContainer>
    )
  }
};

export default App;