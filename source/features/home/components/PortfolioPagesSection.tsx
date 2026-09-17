import { StyleSheet, Text, View } from 'react-native';
import { PORTFOLIO_PAGES } from '../data';
import { colors, radius, spacing, typography } from '../../../shared/theme';

export function PortfolioPagesSection() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio pages</Text>
        <Text style={styles.meta}>{PORTFOLIO_PAGES.length} in nav</Text>
      </View>
      <View style={styles.grid}>
        {PORTFOLIO_PAGES.map(page => (
          <View key={page.key} style={styles.cell}>
            {page.badge && <View style={styles.badge} />}
            <View style={styles.iconWrap}>
              <page.Icon width={17} height={17} color={colors.text} />
            </View>
            <Text style={styles.cellLabel}>{page.label}</Text>
            <Text style={styles.cellMeta} numberOfLines={1}>
              {page.meta}
            </Text>
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
  meta: { ...typography.caption, color: colors.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  cell: {
    width: '32%',
    minHeight: 104,
    padding: spacing.sm,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.card,
    gap: spacing.xs,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: radius.control,
    backgroundColor: colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellLabel: { ...typography.label, color: colors.text },
  cellMeta: { ...typography.caption, color: colors.muted },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.tertiary,
  },
});
