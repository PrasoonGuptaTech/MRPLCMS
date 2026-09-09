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
const DEFAULT_CONFIG = {
  force_update_required: false,
  minimum_android_version: '1.0.0',
  minimum_ios_version: '1.0.0',
  update_message: 'A newer version is required to continue.',
  android_update_url: 'market://details?id=com.mrplcms',
  ios_update_url: '',
} as const;

let configuredInstance: ReturnType<typeof getRemoteConfig> | undefined;
let pendingFetch: Promise<UpdateConfig> | undefined;

function readUpdateConfig(
  config: ReturnType<typeof getRemoteConfig>,
): UpdateConfig {
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

export async function fetchUpdateConfig(): Promise<UpdateConfig> {
  const config = getRemoteConfig();
  if (configuredInstance !== config) {
    config.defaultConfig = DEFAULT_CONFIG;
    config.settings = {
      minimumFetchIntervalMillis: __DEV__ ? 0 : FETCH_INTERVAL_MS,
      fetchTimeoutMillis: 10_000,
    };
    configuredInstance = config;
  }

  // Multiple consumers or foreground events should share the same native
  // request instead of starting duplicate fetches.
  if (!pendingFetch) {
    pendingFetch = fetchAndActivate(config)
      .then(() => readUpdateConfig(config))
      .finally(() => {
        pendingFetch = undefined;
      });
  }

  return pendingFetch;
}
