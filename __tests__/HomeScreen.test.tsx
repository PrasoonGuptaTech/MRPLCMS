import { act, fireEvent, render, screen } from '@testing-library/react-native';
import HomeScreen from '../source/features/home/screens/HomeScreen';

jest.mock('react-native-safe-area-context', () => {
  const mock = require('react-native-safe-area-context/jest/mock');
  return mock.default ?? mock;
});

jest.useFakeTimers();

test('shows a loading state before the dashboard data resolves', () => {
  render(<HomeScreen />);
  expect(screen.getByText('Loading')).toBeTruthy();
  expect(screen.queryByText('Nameless Portfolio')).toBeNull();
});

test('resolves into the unsaved-changes state with a publish action', () => {
  render(<HomeScreen />);
  act(() => jest.advanceTimersByTime(900));
  expect(screen.getByText('Nameless Portfolio')).toBeTruthy();
  expect(screen.getByText('3 changes not published')).toBeTruthy();
  expect(screen.getByText('Publish pending')).toBeTruthy();
});

test('publishing moves the dashboard to the up-to-date state and logs the activity', () => {
  render(<HomeScreen />);
  act(() => jest.advanceTimersByTime(900));
  fireEvent.press(screen.getByText('Publish'));
  expect(screen.getByText('Publishing…')).toBeTruthy();
  act(() => jest.advanceTimersByTime(900));
  expect(screen.getByText('Live and up to date')).toBeTruthy();
  expect(screen.getByText('All changes saved')).toBeTruthy();
  expect(screen.getByText('Published “Nameless Portfolio”')).toBeTruthy();
});
