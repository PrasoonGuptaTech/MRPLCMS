import { useCallback, useEffect, useState } from 'react';
import { fetchUpdateConfig } from '../services/remoteConfig';
import { compareVersions } from '../utils/compareVersions';

type ForceUpdateState = {
  required: boolean;
  message: string;
  updateUrl: string;
  loading: boolean;
};

export function useForceUpdate() {
  const [state, setState] = useState<ForceUpdateState>({
    required: false,
    message: '',
    updateUrl: '',
    loading: true,
  });

  const check = useCallback(async () => {
    setState(previous => ({ ...previous, loading: true }));
    try {
      const config = await fetchUpdateConfig();
      setState({
        required:
          config.forceUpdate &&
          compareVersions(config.currentVersion, config.minimumVersion) < 0,
        message: config.updateMessage,
        updateUrl: config.updateUrl,
        loading: false,
      });
    } catch (error) {
      console.warn('Unable to check for an app update', error);
      setState({
        required: false,
        message: '',
        updateUrl: '',
        loading: false,
      });
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return { ...state, retry: check };
}
