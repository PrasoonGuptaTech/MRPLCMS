import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './source/navigation/main/mainNavigation';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
