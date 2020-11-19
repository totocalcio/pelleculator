import React, { FC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import TipsScreen from './TipsScreen';

const AppTab = createBottomTabNavigator();

const AppTabsScreen: FC = () => (
  <AppTab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#d9376e',
      inactiveTintColor: '#fedbd0',
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Inter_900Black',
      },
      style: {
        backgroundColor: '#442c2e',
        height: 50,
      },
    }}
  >
    <AppTab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name={props.focused ? 'home' : 'home-outline'}
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name={props.focused ? 'heart' : 'heart-outline'}
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <AppTab.Screen
      name="Tips"
      component={TipsScreen}
      options={{
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name={props.focused ? 'file' : 'file-outline'}
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
  </AppTab.Navigator>
);

export default AppTabsScreen;
