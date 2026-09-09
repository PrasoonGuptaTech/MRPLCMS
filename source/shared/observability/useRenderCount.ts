import { useRef } from 'react';

/** Development-only helper for diagnosing unexpected component renders. */
export function useRenderCount(componentName: string) {
  const count = useRef(0);
  count.current += 1;

  if (__DEV__) {
    console.debug(`[render] ${componentName}: ${count.current}`);
  }

  return count.current;
}
