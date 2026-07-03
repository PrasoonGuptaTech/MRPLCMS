import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { checkForUpdate } from './source/feature/forceUpdate/services/remoteConfig';
import { compareVersions } from './source/feature/forceUpdate/utility/Utility';

function App() {
  const [showForceUpdateModal, setShowForceUpdateModal] = useState(false);
  useEffect(() => {
    validateVersion();
  }, []);
  const validateVersion = async () => {
    const config = await checkForUpdate();
    console.log(config);
    const shouldForceUpdate =
      config.forceUpdate &&
      compareVersions(config.currentVersion, config.minimumVersion) < 0;
    if (shouldForceUpdate) {
      setShowForceUpdateModal(true);
    }
  };
  console.log(showForceUpdateModal);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>App</Text>
        {showForceUpdateModal && <Text>Force Update Message Required</Text>}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
