import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import type { PressableProps } from 'react-native';
import { colors, heights, radius, spacing, typography } from '../theme';

type Props = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  loading?: boolean;
  size?: 'default' | 'login' | 'compact';
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  size = 'default',
  ...props
}: Props) {
  const unavailable = disabled || loading;
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(unavailable), busy: loading }}
      disabled={unavailable}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        size === 'login' && styles.login,
        size === 'compact' && styles.compact,
        pressed &&
          (variant === 'primary' ? styles.primaryPressed : styles.pressed),
        unavailable && styles.disabled,
      ]}
    >
      {loading && (
        <ActivityIndicator
          color={variant === 'primary' ? colors.background : colors.text}
        />
      )}
      <Text
        style={[
          typography.button,
          styles.text,
          size === 'compact' && styles.compactText,
          variant === 'primary' && styles.primaryText,
          variant === 'destructive' && styles.destructiveText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: heights.button,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.stack,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  login: { minHeight: heights.loginButton },
  compact: {
    minHeight: 32,
    paddingHorizontal: spacing.md,
    paddingVertical: 0,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  primary: { backgroundColor: colors.primary },
  secondary: { borderWidth: 1, borderColor: colors.border },
  ghost: {},
  destructive: { borderWidth: 1, borderColor: colors.borderStrong },
  text: { color: colors.text, textAlign: 'center' },
  compactText: { fontSize: 12, lineHeight: 16 },
  primaryText: { color: colors.background },
  destructiveText: { color: colors.error },
  primaryPressed: { backgroundColor: colors.primaryPressed },
  pressed: { backgroundColor: colors.elevated },
  disabled: { opacity: 0.4 },
});
