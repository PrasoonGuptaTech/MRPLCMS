const mockFetchAndActivate = jest.fn();
const mockGetValue = jest.fn();
const mockConfig: Record<string, unknown> = {};

jest.mock('@react-native-firebase/remote-config', () => ({
  fetchAndActivate: (...args: unknown[]) => mockFetchAndActivate(...args),
  getRemoteConfig: () => mockConfig,
  getValue: (...args: unknown[]) => mockGetValue(...args),
}));

jest.mock('react-native-device-info', () => ({
  getVersion: () => '1.2.3',
}));

import { fetchUpdateConfig } from '../source/features/force-update/services/remoteConfig';

describe('fetchUpdateConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    for (const key of Object.keys(mockConfig)) delete mockConfig[key];
    mockFetchAndActivate.mockResolvedValue(true);
    mockGetValue.mockImplementation((_config, key: string) => ({
      asBoolean: () => key === 'force_update_required',
      asString: () =>
        ({
          minimum_android_version: '2.0.0',
          minimum_ios_version: '2.0.0',
          update_message: 'Please update',
          android_update_url: 'market://details?id=com.mrplcms',
          ios_update_url: 'https://apps.apple.com/app/id000000000',
        }[key] ?? ''),
    }));
  });

  it('configures defaults and converts Firebase values', async () => {
    await expect(fetchUpdateConfig()).resolves.toEqual({
      forceUpdate: true,
      minimumVersion: '2.0.0',
      updateMessage: 'Please update',
      updateUrl: expect.stringMatching(/^(market:|https:)/),
      currentVersion: '1.2.3',
    });

    expect(mockConfig.defaultConfig).toEqual(
      expect.objectContaining({
        force_update_required: false,
        minimum_android_version: '1.0.0',
        minimum_ios_version: '1.0.0',
      }),
    );
    expect(mockFetchAndActivate).toHaveBeenCalledWith(mockConfig);
  });

  it('propagates fetch failures to the hook fail-open policy', async () => {
    mockFetchAndActivate.mockRejectedValueOnce(new Error('offline'));
    await expect(fetchUpdateConfig()).rejects.toThrow('offline');
  });
});
