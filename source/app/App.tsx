import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ForceUpdateGate } from '../features/force-update/components/ForceUpdateGate';
import { AppStartupTrace } from '../shared/observability/AppStartupTrace';
import { AppErrorBoundary } from '../shared/errors/AppErrorBoundary';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <AppErrorBoundary>
      <SafeAreaProvider>
        <AppStartupTrace />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <ForceUpdateGate />
      </SafeAreaProvider>
    </AppErrorBoundary>
  );
}
