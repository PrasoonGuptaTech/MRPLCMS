module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'source/**/*.{ts,tsx}',
    '!source/**/*.d.ts',
    '!source/**/index.ts',
  ],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/jest/svgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation)/)',
  ],
  coverageThreshold: {
    'source/features/force-update/utils/compareVersions.ts': {
      branches: 90,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
