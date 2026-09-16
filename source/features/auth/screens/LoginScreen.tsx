import { useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MailIcon from '../../../assets/svg/Mail.svg';
import LockIcon from '../../../assets/svg/Lock.svg';
import { Button } from '../../../shared/components/Button';
import { TextField } from '../../../shared/components/TextField';
import {
  colors,
  fonts,
  radius,
  spacing,
  typography,
} from '../../../shared/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const passwordInput = useRef<TextInput>(null);
  const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ? 'Enter a valid email address.'
    : undefined;
  const passwordError = !password ? 'Enter your password.' : undefined;
  function signIn() {
    setSubmitted(true);
    if (emailError || passwordError) {
      return;
    }
    Keyboard.dismiss();
    Alert.alert(
      'Sign-in unavailable',
      'Sign-in is not available yet. Please try again later.',
    );
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
            <View>
              <View style={styles.logo} accessible={false}>
                <Text style={styles.logoText}>D</Text>
              </View>
              <Text accessibilityRole="header" style={styles.title}>
                {'Portfolio\nManager'}
              </Text>
              <Text style={styles.description}>
                Everything your visitors see — home, work, career and contact —
                edited here and published when you’re ready.
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
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => passwordInput.current?.focus()}
                error={submitted ? emailError : undefined}
              />
              <TextField
                ref={passwordInput}
                label="Password"
                icon={<LockIcon width={17} height={17} />}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                textContentType="password"
                returnKeyType="go"
                onSubmitEditing={signIn}
                error={submitted ? passwordError : undefined}
              />
              <Pressable
                accessibilityRole="button"
                hitSlop={13}
                style={styles.forgot}
                onPress={() =>
                  Alert.alert(
                    'Password recovery unavailable',
                    'Password recovery is not available yet. Please contact your administrator.',
                  )
                }
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
              <Button label="Sign in" size="login" onPress={signIn} />
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
    paddingTop: 96,
    gap: spacing.lg,
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
  forgot: { alignSelf: 'flex-end', minHeight: 18, justifyContent: 'center' },
  forgotText: { ...typography.label, color: colors.muted },
});
