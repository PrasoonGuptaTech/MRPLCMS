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
  const mounted = useRef(true);
  const [state, setState] = useState<ForceUpdateState>({
    required: false,
    message: '',
    updateUrl: '',
    loading: true,
  });

  const check = useCallback(async (showLoading = true) => {
    if (checking.current) return;
    checking.current = true;
    if (showLoading) {
      setState(previous =>
        previous.loading ? previous : { ...previous, loading: true },
      );
    }
    try {
      const config = await fetchUpdateConfig();
      const nextState = {
        required:
          config.forceUpdate &&
          compareVersions(config.currentVersion, config.minimumVersion) < 0,
        message: config.updateMessage,
        updateUrl: config.updateUrl,
        loading: false,
      };
      if (mounted.current) {
        setState(previous =>
          previous.required === nextState.required &&
          previous.message === nextState.message &&
          previous.updateUrl === nextState.updateUrl &&
          previous.loading === nextState.loading
            ? previous
            : nextState,
        );
      }
    } catch (error) {
      if (__DEV__) console.warn('Unable to check for an app update', error);
      if (mounted.current) {
        setState(previous =>
          previous.required || previous.loading
            ? { ...previous, loading: false }
            : previous,
        );
      }
    } finally {
      checking.current = false;
    }
  }, []);

  const retry = useCallback(() => check(true), [check]);

  useEffect(() => {
    check();
    return () => {
      mounted.current = false;
    };
  }, [check]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') check(false);
    });
    return () => subscription.remove();
  }, [check]);

  return { ...state, retry };
}
