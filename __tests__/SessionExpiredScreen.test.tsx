import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fireEvent, render, screen } from '@testing-library/react-native';
import LoginScreen from '../source/features/auth/screens/LoginScreen';
import SessionExpiredScreen from '../source/features/auth/screens/SessionExpiredScreen';
import type { RootStackParamList } from '../source/app/navigation/types';

jest.mock('react-native-safe-area-context', () => {
  const mock = require('react-native-safe-area-context/jest/mock');
  return mock.default ?? mock;
});

const Stack = createStackNavigator<RootStackParamList>();

function renderFromSessionExpired() {
  render(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SessionExpired"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SessionExpired" component={SessionExpiredScreen} />
      </Stack.Navigator>
    </NavigationContainer>,
  );
}

test('explains the inactivity timeout and that drafts are kept on device', () => {
  renderFromSessionExpired();
  expect(screen.getByText('Session\nexpired')).toBeTruthy();
  expect(
    screen.getByText(/unpublished drafts are safely saved on this device/i),
  ).toBeTruthy();
});

test('re-authenticating resets the stack back to the login screen', () => {
  renderFromSessionExpired();
  fireEvent.press(screen.getByText('Re-authenticate'));
  expect(screen.getByText('Sign in')).toBeTruthy();
  expect(screen.queryByText('Re-authenticate')).toBeNull();
});
