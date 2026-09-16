import { forwardRef, useState } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { colors, heights, radius, spacing, typography } from '../theme';

type Props = TextInputProps & {
  label: string;
  icon?: ReactNode;
  error?: string;
};
export const TextField = forwardRef<TextInput, Props>(function TextFieldControl(
  { label, icon, error, style, onFocus, onBlur, editable = true, ...props },
  ref,
) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.field,
          focused && styles.focused,
          Boolean(error) && styles.invalid,
          !editable && styles.disabled,
        ]}
      >
        {icon && (
          <View
            accessible={false}
            importantForAccessibility="no-hide-descendants"
          >
            {icon}
          </View>
        )}
        <TextInput
          {...props}
          ref={ref}
          editable={editable}
          accessibilityLabel={label}
          accessibilityHint={error || props.accessibilityHint}
          placeholderTextColor={colors.placeholder}
          selectionColor={colors.secondary}
          style={[styles.input, style]}
          onFocus={event => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={event => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
      </View>
      {error && (
        <Text
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={styles.error}
        >
          {error}
        </Text>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  label: { ...typography.label, color: colors.secondary },
  field: {
    minHeight: heights.input,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.control,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.control,
    backgroundColor: colors.field,
  },
  focused: { borderColor: colors.muted },
  invalid: { borderColor: colors.error },
  disabled: { opacity: 0.4 },
  input: {
    ...typography.input,
    color: colors.text,
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.stack,
    paddingHorizontal: 0,
    includeFontPadding: false,
  },
  error: { ...typography.caption, color: colors.error },
});
