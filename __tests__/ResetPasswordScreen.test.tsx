import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import LoginScreen from '../source/features/auth/screens/LoginScreen';
import ResetPasswordScreen from '../source/features/auth/screens/ResetPasswordScreen';
import type { RootStackParamList } from '../source/app/navigation/types';

jest.mock('react-native-safe-area-context', () => {
  const mock = require('react-native-safe-area-context/jest/mock');
  return mock.default ?? mock;
});

jest.useFakeTimers();

const Stack = createStackNavigator<RootStackParamList>();

function renderFromLogin() {
  render(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>,
  );
  fireEvent.press(screen.getByText('Forgot password?'));
}

beforeEach(() => jest.spyOn(Alert, 'alert').mockImplementation(() => {}));
afterEach(() => jest.restoreAllMocks());

test('defers email validation until the reset link is requested', () => {
  renderFromLogin();
  expect(screen.queryByText('Enter a valid email address.')).toBeNull();
  fireEvent.press(screen.getByText('Send reset link'));
  expect(screen.getByText('Enter a valid email address.')).toBeTruthy();
  expect(Alert.alert).not.toHaveBeenCalled();
});

test('shows a sending state and explains recovery is unavailable without claiming success', () => {
  renderFromLogin();
  fireEvent.changeText(screen.getByLabelText('Email'), 'devendra@studio.com');
  fireEvent.press(screen.getByText('Send reset link'));
  expect(screen.getByText('Sending…')).toBeTruthy();
  act(() => jest.runAllTimers());
  expect(Alert.alert).toHaveBeenCalledWith(
    'Password recovery unavailable',
    expect.any(String),
    expect.anything(),
  );
});

test('back button returns to the login screen', () => {
  renderFromLogin();
  fireEvent.press(screen.getByLabelText('Go back'));
  expect(screen.getByText('Sign in')).toBeTruthy();
});
