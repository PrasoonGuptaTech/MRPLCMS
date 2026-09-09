import { render, waitFor } from '@testing-library/react-native';
import { AppStartupTrace } from '../source/shared/observability/AppStartupTrace';

const mockStart = jest.fn();
const mockStop = jest.fn();

jest.mock('@react-native-firebase/perf', () => ({
  getPerformance: jest.fn(() => ({})),
  trace: jest.fn(() => ({ start: mockStart, stop: mockStop })),
}));

describe('AppStartupTrace', () => {
  it('stops the Firebase trace after startup interactions settle', async () => {
    mockStart.mockResolvedValueOnce(null);
    mockStop.mockResolvedValueOnce(null);
    jest
      .spyOn(globalThis, 'requestAnimationFrame')
      .mockImplementation((callback: (time: number) => void) => {
        callback(0);
        return 1;
      });

    render(<AppStartupTrace />);

    await waitFor(() => expect(mockStart).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockStop).toHaveBeenCalledTimes(1));
  });
});
