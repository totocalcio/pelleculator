import * as React from 'react';
import { AppLoading } from 'expo';
import { KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'

const RootStack = createStackNavigator();
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
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <AppTabsScreen />
        </KeyboardAvoidingView>
      </NavigationContainer>
    )
  }
};

export default App;