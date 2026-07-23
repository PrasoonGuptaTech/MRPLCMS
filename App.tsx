import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { checkForUpdate } from './source/feature/forceUpdate/services/remoteConfig';
import { compareVersions } from './source/feature/forceUpdate/utility/Utility';
import {
  crash,
  getCrashlytics,
  log,
  setAttributes,
  setUserId,
} from '@react-native-firebase/crashlytics';

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
  useEffect(() => {
    log(getCrashlytics(), 'App Mounted');
  }, []);
  const forceCrash = async () => {
    const crashlytics = getCrashlytics();
    log(crashlytics, 'User Tapped Force Crash');
    await Promise.all([
      setUserId(crashlytics, 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9'),
      setAttributes(crashlytics, {
        role: 'admin',
        email: 'ishankgupta1may@gmail.com',
        username: 'Prasoon Gupta',
      }),
    ]);
    crash(crashlytics);
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>App</Text>
        <Button title="Force Crash" onPress={forceCrash} />
        <Button title="Test Crash" onPress={() => crash(getCrashlytics())} />
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
