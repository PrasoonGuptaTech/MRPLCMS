import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import { colors } from '../../shared/theme';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: colors.background },
};

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
