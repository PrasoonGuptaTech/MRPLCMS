import { createStackNavigator } from '@react-navigation/stack';
import type { MoreStackParamList } from '../../../app/navigation/types';
import MoreScreen from '../screens/MoreScreen';

const Stack = createStackNavigator<MoreStackParamList>();

export default function MoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={MoreScreen} />
    </Stack.Navigator>
  );
}
