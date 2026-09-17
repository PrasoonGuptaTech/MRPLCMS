import { Pressable, StyleSheet, Text, View } from 'react-native';
import { QUICK_ACTIONS } from '../data';
import { colors, radius, spacing, typography } from '../../../shared/theme';

export function QuickActionsSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Quick actions</Text>
      <View style={styles.grid}>
        {QUICK_ACTIONS.map(action => (
          <Pressable
            key={action.key}
            accessibilityRole="button"
            style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
          >
            <action.Icon width={17} height={17} color={colors.secondary} />
            <Text style={styles.label} numberOfLines={1}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.sm },
  title: { ...typography.label, color: colors.text, fontSize: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  cell: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.control,
    borderRadius: radius.panel,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.field,
  },
  pressed: { backgroundColor: colors.elevated },
  label: { ...typography.label, color: colors.secondary, flexShrink: 1 },
});
