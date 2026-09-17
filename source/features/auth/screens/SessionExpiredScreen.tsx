import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../../../shared/components/Button';
import {
  colors,
  fonts,
  radius,
  spacing,
  typography,
} from '../../../shared/theme';
import type { RootStackParamList } from '../../../app/navigation/types';

type Navigation = StackNavigationProp<RootStackParamList, 'SessionExpired'>;

export default function SessionExpiredScreen() {
  const navigation = useNavigation<Navigation>();

  function reauthenticate() {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.logo} accessible={false}>
          <Text style={styles.logoText}>D</Text>
        </View>
        <Text accessibilityRole="header" style={styles.title}>
          {'Session\nexpired'}
        </Text>
        <Text style={styles.description}>
          You were inactive for a while, so we signed you out. Your unpublished
          drafts are safely saved on this device.
        </Text>
        <View style={styles.action}>
          <Button
            label="Re-authenticate"
            size="login"
            onPress={reauthenticate}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingHorizontal: spacing.authGutter,
    gap: spacing.lg,
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: radius.logo,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoText: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 24,
    color: colors.background,
  },
  title: { ...typography.display, color: colors.text, textAlign: 'center' },
  description: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
  },
  action: { marginTop: spacing.sm },
});
