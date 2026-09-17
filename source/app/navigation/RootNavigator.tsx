import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import ResetPasswordScreen from '../../features/auth/screens/ResetPasswordScreen';
import SessionExpiredScreen from '../../features/auth/screens/SessionExpiredScreen';
import { colors } from '../../shared/theme';
import MainTabs from './MainTabs';
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
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen
        name="SessionExpired"
        component={SessionExpiredScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
