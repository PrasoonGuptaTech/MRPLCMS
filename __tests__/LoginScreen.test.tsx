import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fireEvent, render, screen } from '@testing-library/react-native';
import LoginScreen from '../source/features/auth/screens/LoginScreen';
import ResetPasswordScreen from '../source/features/auth/screens/ResetPasswordScreen';
import type { RootStackParamList } from '../source/app/navigation/types';

jest.mock('react-native-safe-area-context', () => {
  const mock = require('react-native-safe-area-context/jest/mock');
  return mock.default ?? mock;
});

const Stack = createStackNavigator<RootStackParamList>();

function renderLoginScreen() {
  return render(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>,
  );
}

beforeEach(() => jest.spyOn(Alert, 'alert').mockImplementation(() => {}));
afterEach(() => jest.restoreAllMocks());

test('starts with empty credentials and defers validation until submission', () => {
  renderLoginScreen();
  expect(screen.getByLabelText('Email')).toHaveProp('value', '');
  expect(screen.getByLabelText('Password')).toHaveProp('secureTextEntry', true);
  expect(screen.queryByText('Enter a valid email address.')).toBeNull();
  fireEvent.press(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByText('Enter a valid email address.')).toBeTruthy();
  expect(screen.getByText('Enter your password.')).toBeTruthy();
  expect(Alert.alert).not.toHaveBeenCalled();
});

test('rejects any password other than the demo credential without simulating success', () => {
  renderLoginScreen();
  fireEvent.press(screen.getByText('Sign in'));
  fireEvent.changeText(screen.getByLabelText('Email'), ' admin@example.com ');
  fireEvent.changeText(screen.getByLabelText('Password'), 'test-password');
  expect(screen.queryByText('Enter a valid email address.')).toBeNull();
  fireEvent(screen.getByLabelText('Password'), 'submitEditing');
  expect(
    screen.getByText('Incorrect password — use “portfolio”.'),
  ).toBeTruthy();
  expect(Alert.alert).not.toHaveBeenCalled();
});

test('the demo credential clears errors but still never grants access', () => {
  renderLoginScreen();
  fireEvent.press(screen.getByText('Sign in'));
  fireEvent.changeText(screen.getByLabelText('Email'), ' admin@example.com ');
  fireEvent.changeText(screen.getByLabelText('Password'), 'portfolio');
  expect(screen.queryByText('Enter a valid email address.')).toBeNull();
  expect(screen.queryByText('Enter your password.')).toBeNull();
  fireEvent(screen.getByLabelText('Password'), 'submitEditing');
  expect(Alert.alert).toHaveBeenCalledWith(
    'Sign-in unavailable',
    expect.any(String),
  );
  expect(screen.getByText('Sign in')).toBeTruthy();
});

test('forgot password opens the reset password screen instead of alerting', () => {
  renderLoginScreen();
  fireEvent.press(screen.getByText('Forgot password?'));
  expect(Alert.alert).not.toHaveBeenCalled();
  expect(screen.getByText('Reset password')).toBeTruthy();
  expect(
    screen.getByText(
      'We’ll email a secure link to the address on your account.',
    ),
  ).toBeTruthy();
});
