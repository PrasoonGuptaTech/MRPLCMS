import { act, renderHook, waitFor } from '@testing-library/react-native';
import { AppState, type AppStateStatus } from 'react-native';
import { useForceUpdate } from '../source/features/force-update/hooks/useForceUpdate';
import { fetchUpdateConfig } from '../source/features/force-update/services/remoteConfig';

jest.mock('../source/features/force-update/services/remoteConfig', () => ({
  fetchUpdateConfig: jest.fn(),
}));

const mockFetchUpdateConfig = jest.mocked(fetchUpdateConfig);

describe('useForceUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('requires an update when the installed version is below the minimum', async () => {
    mockFetchUpdateConfig.mockResolvedValue({
      forceUpdate: true,
      minimumVersion: '2.0.0',
      currentVersion: '1.0.0',
      updateMessage: 'Upgrade required',
      updateUrl: 'https://example.com/update',
    });

    const { result } = renderHook(() => useForceUpdate());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current).toEqual(
      expect.objectContaining({
        required: true,
        message: 'Upgrade required',
        updateUrl: 'https://example.com/update',
      }),
    );
  });

  it('fails open when Remote Config is unavailable', async () => {
    mockFetchUpdateConfig.mockRejectedValue(new Error('offline'));
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useForceUpdate());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.required).toBe(false);
  });

  it('checks again when the app returns to the foreground', async () => {
    let appStateListener: ((state: AppStateStatus) => void) | undefined;
    jest
      .spyOn(AppState, 'addEventListener')
      .mockImplementation((_event, listener) => {
        appStateListener = listener;
        return { remove: jest.fn() };
      });
    mockFetchUpdateConfig.mockResolvedValue({
      forceUpdate: false,
      minimumVersion: '1.0.0',
      currentVersion: '1.0.0',
      updateMessage: '',
      updateUrl: '',
    });

    renderHook(() => useForceUpdate());
    await waitFor(() => expect(mockFetchUpdateConfig).toHaveBeenCalledTimes(1));
    await act(async () => appStateListener?.('active'));
    await waitFor(() => expect(mockFetchUpdateConfig).toHaveBeenCalledTimes(2));
  });
});
