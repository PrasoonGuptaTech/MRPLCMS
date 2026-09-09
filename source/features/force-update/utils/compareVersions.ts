export function compareVersions(
  currentVersion: string,
  minimumVersion: string,
) {
  const parse = (version: string) => {
    const match = version.trim().match(/^(\d+)\.(\d+)\.(\d+)/);
    return match ? match.slice(1).map(Number) : null;
  };

  const current = parse(currentVersion);
  const minimum = parse(minimumVersion);
  if (!current || !minimum) return 0;

  for (let index = 0; index < 3; index += 1) {
    if (current[index] < minimum[index]) return -1;
    if (current[index] > minimum[index]) return 1;
  }
  return 0;
}
