import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import ChevronLeftIcon from '../../../assets/svg/ChevronLeft.svg';
import MailIcon from '../../../assets/svg/Mail.svg';
import { Button } from '../../../shared/components/Button';
import { TextField } from '../../../shared/components/TextField';
import {
  colors,
  fonts,
  radius,
  spacing,
  typography,
} from '../../../shared/theme';
import type { RootStackParamList } from '../../../app/navigation/types';

type Navigation = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
  const navigation = useNavigation<Navigation>();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ? 'Enter a valid email address.'
    : undefined;

  function sendResetLink() {
    setSubmitted(true);
    if (emailError) {
      return;
    }
    Keyboard.dismiss();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      Alert.alert(
        'Password recovery unavailable',
        'Password recovery is not available yet. Please contact your administrator.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    }, 900);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.content}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={13}
              style={styles.header}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon width={17} height={17} />
              <Text style={styles.headerTitle}>Reset password</Text>
            </Pressable>
            <View>
              <View style={styles.logo} accessible={false}>
                <Text style={styles.logoText}>D</Text>
              </View>
              <Text accessibilityRole="header" style={styles.title}>
                {'Reset your\npassword'}
              </Text>
              <Text style={styles.description}>
                We’ll email a secure link to the address on your account.
              </Text>
            </View>
            <View style={styles.form}>
              <TextField
                label="Email"
                icon={<MailIcon width={17} height={17} />}
                value={email}
                onChangeText={setEmail}
                placeholder="devendra@studio.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="username"
                returnKeyType="send"
                onSubmitEditing={sendResetLink}
                editable={!sending}
                error={submitted ? emailError : undefined}
              />
              <Button
                label={sending ? 'Sending…' : 'Send reset link'}
                size="login"
                loading={sending}
                onPress={sendResetLink}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.authGutter,
    paddingBottom: spacing.xl,
  },
  content: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'flex-start',
    minHeight: spacing.xl,
  },
  headerTitle: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.text,
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: radius.logo,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 24,
    color: colors.background,
  },
  title: { ...typography.display, color: colors.text, marginTop: spacing.lg },
  description: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.sm,
  },
  form: { gap: 15 },
});
