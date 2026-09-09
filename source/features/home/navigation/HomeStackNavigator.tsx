import { createStackNavigator } from '@react-navigation/stack';
import type { HomeStackParamList } from '../../../app/navigation/types';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
