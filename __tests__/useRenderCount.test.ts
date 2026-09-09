import { renderHook } from '@testing-library/react-native';
import { useRenderCount } from '../source/shared/observability/useRenderCount';

describe('useRenderCount', () => {
  it('tracks component renders for development profiling', () => {
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    const { result, rerender } = renderHook(() => useRenderCount('Example'));

    expect(result.current).toBe(1);
    rerender(undefined);
    expect(result.current).toBe(2);
    expect(console.debug).toHaveBeenLastCalledWith('[render] Example: 2');
  });
});
