import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../features/home/pages/homeScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
