import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { AppErrorBoundary } from '../source/shared/errors/AppErrorBoundary';

const mockRecordError = jest.fn();

jest.mock('@react-native-firebase/crashlytics', () => ({
  getCrashlytics: jest.fn(() => ({})),
  recordError: (...args: unknown[]) => mockRecordError(...args),
}));

function Broken({ broken }: { broken: boolean }) {
  if (broken) throw new Error('render failed');
  return <Text>Application content</Text>;
}

describe('AppErrorBoundary', () => {
  it('reports rendering errors and provides recovery UI', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const screen = render(
      <AppErrorBoundary>
        <Broken broken />
      </AppErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(mockRecordError).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByText('Try again'));
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });
});
