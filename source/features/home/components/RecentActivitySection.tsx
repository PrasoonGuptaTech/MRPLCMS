import { StyleSheet, Text, View } from 'react-native';
import type { ActivityItem } from '../data';
import { colors, radius, spacing, typography } from '../../../shared/theme';

type Props = { items: ActivityItem[]; caption: string };

export function RecentActivitySection({ items, caption }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent activity</Text>
        <Text style={styles.caption}>{caption}</Text>
      </View>
      <View style={styles.card}>
        {items.map((item, index) => (
          <View
            key={item.key}
            style={[styles.row, index < items.length - 1 && styles.rowDivider]}
          >
            <View style={styles.iconWrap}>
              <item.Icon width={14} height={14} color={colors.secondary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.label} numberOfLines={1}>
                {item.label}
              </Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.sm },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { ...typography.label, color: colors.text, fontSize: 16 },
  caption: { ...typography.caption, color: colors.muted },
  card: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stack,
    paddingVertical: spacing.control,
  },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.elevated },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, gap: 2 },
  label: { ...typography.label, color: colors.secondary },
  timestamp: { ...typography.caption, color: colors.muted },
});
