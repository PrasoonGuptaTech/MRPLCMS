import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from '@react-native-firebase/remote-config';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export type UpdateConfig = {
  forceUpdate: boolean;
  minimumVersion: string;
  updateMessage: string;
  updateUrl: string;
  currentVersion: string;
};

const FETCH_INTERVAL_MS = 60 * 60 * 1000;

export async function fetchUpdateConfig(): Promise<UpdateConfig> {
  const config = getRemoteConfig();
  config.defaultConfig = {
    force_update_required: false,
    minimum_android_version: '1.0.0',
    minimum_ios_version: '1.0.0',
    update_message: 'A newer version is required to continue.',
    android_update_url: 'market://details?id=com.mrplcms',
    ios_update_url: '',
  };
  config.settings = {
    minimumFetchIntervalMillis: __DEV__ ? 0 : FETCH_INTERVAL_MS,
    fetchTimeoutMillis: 10_000,
  };
  await fetchAndActivate(config);

  const versionKey =
    Platform.OS === 'android'
      ? 'minimum_android_version'
      : 'minimum_ios_version';
  const updateUrlKey =
    Platform.OS === 'android' ? 'android_update_url' : 'ios_update_url';

  return {
    forceUpdate: getValue(config, 'force_update_required').asBoolean(),
    minimumVersion: getValue(config, versionKey).asString(),
    updateMessage: getValue(config, 'update_message').asString(),
    updateUrl: getValue(config, updateUrlKey).asString(),
    currentVersion: DeviceInfo.getVersion(),
  };
}
