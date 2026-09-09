/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('../source/app/navigation/RootNavigator', () => {
  const ReactModule = require('react');
  const { View } = require('react-native');
  return () => ReactModule.createElement(View, { testID: 'root-navigator' });
});

jest.mock('../source/features/force-update/components/ForceUpdateGate', () => ({
  ForceUpdateGate: () => null,
}));

jest.mock('../source/shared/observability/AppStartupTrace', () => ({
  AppStartupTrace: () => null,
}));

jest.mock('../source/shared/errors/AppErrorBoundary', () => ({
  AppErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
