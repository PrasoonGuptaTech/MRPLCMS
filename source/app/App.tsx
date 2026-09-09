import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ForceUpdateGate } from '../features/force-update/components/ForceUpdateGate';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <ForceUpdateGate />
    </SafeAreaProvider>
  );
}
