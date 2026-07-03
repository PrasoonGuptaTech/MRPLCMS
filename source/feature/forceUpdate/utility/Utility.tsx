export const compareVersions = (
  currentVersion: string,
  minimumVersion: string,
) => {
  const current = currentVersion.split('.').map(Number);
  const minimum = minimumVersion.split('.').map(Number);

  for (let i = 0; i < Math.max(current.length, minimum.length); i++) {
    const c = current[i] || 0;
    const m = minimum[i] || 0;

    if (c < m) return -1;
    if (c > m) return 1;
  }

  return 0;
};
