import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../features/home/pages/homeScreen';

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
