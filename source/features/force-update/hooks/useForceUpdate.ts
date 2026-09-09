import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { fetchUpdateConfig } from '../services/remoteConfig';
import { compareVersions } from '../utils/compareVersions';

type ForceUpdateState = {
  required: boolean;
  message: string;
  updateUrl: string;
  loading: boolean;
};

export function useForceUpdate() {
  const checking = useRef(false);
  const [state, setState] = useState<ForceUpdateState>({
    required: false,
    message: '',
    updateUrl: '',
    loading: true,
  });

  const check = useCallback(async () => {
    if (checking.current) return;
    checking.current = true;
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
    } finally {
      checking.current = false;
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') check();
    });
    return () => subscription.remove();
  }, [check]);

  return { ...state, retry: check };
}
