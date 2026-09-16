import { StatusBar } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStartupTrace } from '../shared/observability/AppStartupTrace';
import { AppErrorBoundary } from '../shared/errors/AppErrorBoundary';
import { colors, fonts } from '../shared/theme';
import RootNavigator from './navigation/RootNavigator';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.error,
  },
  fonts: {
    regular: { fontFamily: fonts.regular, fontWeight: '400' as const },
    medium: { fontFamily: fonts.medium, fontWeight: '500' as const },
    bold: { fontFamily: fonts.semibold, fontWeight: '600' as const },
    heavy: { fontFamily: fonts.semibold, fontWeight: '600' as const },
  },
};

export default function App() {
  return (
    <AppErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <AppStartupTrace />
        <NavigationContainer theme={navigationTheme}>
          <RootNavigator />
        </NavigationContainer>
        {/* ForceUpdateGate is temporarily disabled; re-enable once the
            Remote Config minimum version and app versionName are aligned. */}
      </SafeAreaProvider>
    </AppErrorBoundary>
  );
}
