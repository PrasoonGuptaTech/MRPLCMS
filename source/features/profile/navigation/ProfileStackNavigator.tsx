import { createStackNavigator } from '@react-navigation/stack';
import type { ProfileStackParamList } from '../../../app/navigation/types';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
