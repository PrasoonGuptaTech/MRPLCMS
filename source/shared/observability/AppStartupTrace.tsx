import { useEffect } from 'react';
import { getPerformance, trace } from '@react-native-firebase/perf';

export function AppStartupTrace() {
  useEffect(() => {
    const startupTrace = trace(getPerformance(), 'js_app_interactive');
    let active = true;
    let frame: number | undefined;

    startupTrace
      .start()
      .then(() => {
        if (!active) return;
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (active) startupTrace.stop();
          });
        });
      })
      .catch(error => {
        if (__DEV__) {
          console.warn(
            'Unable to record application startup performance',
            error,
          );
        }
      });

    return () => {
      active = false;
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
