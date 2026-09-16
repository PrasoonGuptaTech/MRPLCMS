import { Alert } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import LoginScreen from '../source/features/auth/screens/LoginScreen';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: require('react-native').View,
}));

beforeEach(() => jest.spyOn(Alert, 'alert').mockImplementation(() => {}));
afterEach(() => jest.restoreAllMocks());

test('starts with empty credentials and defers validation until submission', () => {
  render(<LoginScreen />);
  expect(screen.getByLabelText('Email')).toHaveProp('value', '');
  expect(screen.getByLabelText('Password')).toHaveProp('secureTextEntry', true);
  expect(screen.queryByText('Enter a valid email address.')).toBeNull();
  fireEvent.press(screen.getByRole('button', { name: 'Sign in' }));
  expect(screen.getByText('Enter a valid email address.')).toBeTruthy();
  expect(screen.getByText('Enter your password.')).toBeTruthy();
  expect(Alert.alert).not.toHaveBeenCalled();
});

test('clears field errors after correction and never simulates a successful login', () => {
  render(<LoginScreen />);
  fireEvent.press(screen.getByText('Sign in'));
  fireEvent.changeText(screen.getByLabelText('Email'), ' admin@example.com ');
  fireEvent.changeText(screen.getByLabelText('Password'), 'test-password');
  expect(screen.queryByText('Enter a valid email address.')).toBeNull();
  expect(screen.queryByText('Enter your password.')).toBeNull();
  fireEvent(screen.getByLabelText('Password'), 'submitEditing');
  expect(Alert.alert).toHaveBeenCalledWith(
    'Sign-in unavailable',
    expect.any(String),
  );
  expect(screen.getByText('Sign in')).toBeTruthy();
});

test('password recovery explains availability without claiming to send email', () => {
  render(<LoginScreen />);
  fireEvent.press(screen.getByText('Forgot password?'));
  expect(Alert.alert).toHaveBeenCalledWith(
    'Password recovery unavailable',
    expect.any(String),
  );
});
