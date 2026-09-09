import { compareVersions } from '../source/features/force-update/utils/compareVersions';

describe('compareVersions', () => {
  it.each([
    ['1.0.0', '1.0.1', -1],
    ['1.2.0', '1.1.9', 1],
    ['2.0.0', '2.0.0', 0],
    ['1.0.0-beta.1', '1.0.0', 0],
  ])('compares %s with %s', (current, minimum, expected) => {
    expect(compareVersions(current, minimum)).toBe(expected);
  });

  it('fails open when remote configuration contains an invalid version', () => {
    expect(compareVersions('1.0.0', 'invalid')).toBe(0);
  });
});
