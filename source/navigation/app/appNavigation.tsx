import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '../homeStack/homeStackNavigator';
import { TabBarHomeLogo } from '../components/Home/TabBarLogo';
import { AppNavigationStyles } from '../styles/appNavigation/appNavigationStyles';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: route.name === 'HomeTab' ? '#000000' : '#FFFFFF',
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => TabBarHomeLogo(),
          tabBarLabel: 'Dashboard',
          tabBarLabelStyle: AppNavigationStyles.HomeTabTitleStyle,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => TabBarHomeLogo(),
          tabBarLabel: 'Dashboard',
          tabBarLabelStyle: AppNavigationStyles.HomeTabTitleStyle,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
