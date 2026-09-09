import {
  ActivityIndicator,
  Alert,
  Button,
  Linking,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../../shared/theme';
import { useForceUpdate } from '../hooks/useForceUpdate';

export function ForceUpdateGate() {
  const { required, message, updateUrl, loading, retry } = useForceUpdate();
  if (!required) return null;

  return (
    <Modal visible animationType="fade" presentationStyle="fullScreen">
      <View style={styles.container} accessibilityViewIsModal>
        {loading ? <ActivityIndicator /> : null}
        <Text accessibilityRole="header" style={styles.title}>
          Update required
        </Text>
        <Text style={styles.message}>{message}</Text>
        {updateUrl ? (
          <Button
            title="Update now"
            onPress={async () => {
              try {
                await Linking.openURL(updateUrl);
              } catch {
                Alert.alert(
                  'Unable to open the store',
                  'Please update the app directly from your device app store.',
                );
              }
            }}
          />
        ) : (
          <Button title="Check again" onPress={retry} disabled={loading} />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  title: { color: colors.text, fontSize: 24, fontWeight: '700' },
  message: {
    color: colors.text,
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});
