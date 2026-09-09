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
import DeviceInfo from 'react-native-device-info';

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
  const onLogs = async () => {
    const apilevel = await DeviceInfo.getApiLevel();
    const applicationName = DeviceInfo.getApplicationName();
    const getBaseOs = await DeviceInfo.getBaseOs();
    const getBatteryLevel = await DeviceInfo.getBatteryLevel();
    const getBootloader = await DeviceInfo.getBootloader();
    const getBrand = DeviceInfo.getBrand();
    const getBrightness = await DeviceInfo.getBrightness();
    const getBuildId = await DeviceInfo.getBuildId();
    const getBuildNumber = DeviceInfo.getBuildNumber();
    const getBundleId = DeviceInfo.getBundleId();
    const getCarrier = await DeviceInfo.getCarrier();
    const getDevice = await DeviceInfo.getDevice();
    const getDeviceId = DeviceInfo.getDeviceId();
    const getDeviceName = await DeviceInfo.getDeviceName();
    const getDeviceType = DeviceInfo.getDeviceType();
    const getDisplay = await DeviceInfo.getDisplay();

    const getFreeDiskStorage = await DeviceInfo.getFreeDiskStorage();
    const getHardware = await DeviceInfo.getHardware();
    const getHost = await DeviceInfo.getHost();
    const getHostNames = await DeviceInfo.getHostNames();
    const getIpAddress = await DeviceInfo.getIpAddress();
    const getManufacturer = await DeviceInfo.getManufacturer();
    const getMaxMemory = await DeviceInfo.getMaxMemory();
    const getModel = DeviceInfo.getModel();
    const getSerialNumber = await DeviceInfo.getSerialNumber();
    const getSystemAvailableFeatures =
      await DeviceInfo.getSystemAvailableFeatures();
    const getSystemName = DeviceInfo.getSystemName();
    const getSystemVersion = DeviceInfo.getSystemVersion();
    const getTotalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
    const getTotalMemory = await DeviceInfo.getTotalMemory();
    const getType = await DeviceInfo.getType();
    const getUsedMemory = await DeviceInfo.getUsedMemory();
    const getVersion = DeviceInfo.getVersion();

    console.log('JSON', {
      apilevel,
      applicationName,
      getBaseOs,
      getBatteryLevel,
      getBootloader,
      getBrand,
      getBrightness,
      getBuildId,
      getBuildNumber,
      getBundleId,
      getCarrier,
      getDevice,
      getDeviceId,
      getDeviceName,
      getDeviceType,
      getDisplay,
      getFreeDiskStorage,
      getHardware,
      getHost,
      getHostNames,
      getIpAddress,
      getManufacturer,
      getMaxMemory,
      getModel,
      getSerialNumber,
      getSystemAvailableFeatures,
      getSystemName,
      getSystemVersion,
      getTotalDiskCapacity,
      getTotalMemory,
      getType,
      getUsedMemory,
      getVersion,
    });
  };
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>App</Text>
        <Button title="Force Crash" onPress={forceCrash} />
        <Button title="Test Crash" onPress={() => crash(getCrashlytics())} />
        <Button title="Logs" onPress={onLogs} />
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
