import firebase from '@react-native-firebase/app';
import remoteConfig from '@react-native-firebase/remote-config';
import { Platform } from 'react-native';

export const checkForUpdate = async () => {
  console.log(firebase.apps);
  await remoteConfig().setDefaults({
    force_update_required: true,
    minimum_android_version: '1.0.0',
    minimum_ios_version: '1.0.0',
    update_message: 'Please update your app.',
  });
  await remoteConfig().fetchAndActivate();

  const forceUpdate = remoteConfig()
    .getValue('force_update_required')
    .asBoolean();
  const minimumVersion =
    Platform.OS === 'android'
      ? remoteConfig().getValue('minimum_android_version').asString()
      : remoteConfig().getValue('minimum_ios_version').asString();
  const updateMessage = remoteConfig().getValue('update_message').asString();
  const currentVersion = '1.0.0';

  return {
    forceUpdate,
    minimumVersion,
    updateMessage,
    currentVersion,
  };
};
