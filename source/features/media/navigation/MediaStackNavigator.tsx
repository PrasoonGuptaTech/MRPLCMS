import { createStackNavigator } from '@react-navigation/stack';
import type { MediaStackParamList } from '../../../app/navigation/types';
import MediaScreen from '../screens/MediaScreen';

const Stack = createStackNavigator<MediaStackParamList>();

export default function MediaStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Media" component={MediaScreen} />
    </Stack.Navigator>
  );
}
