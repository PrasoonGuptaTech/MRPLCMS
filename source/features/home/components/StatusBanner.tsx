import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../shared/components/Button';
import { colors, radius, spacing, typography } from '../../../shared/theme';

type Props = {
  unsavedCount: number;
  publishing: boolean;
  lastPublishedLabel?: string;
  onPublish: () => void;
};

export function StatusBanner({
  unsavedCount,
  publishing,
  lastPublishedLabel,
  onPublish,
}: Props) {
  const upToDate = unsavedCount === 0;

  if (upToDate) {
    return (
      <View style={[styles.base, styles.published]}>
        <View style={styles.row}>
          <View style={[styles.dot, styles.publishedDot]} />
          <Text style={styles.publishedTitle}>Live and up to date</Text>
        </View>
        <Text style={styles.caption}>
          Last published {lastPublishedLabel} · devendra.design
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.base, styles.unsaved]}>
      <View style={[styles.dot, styles.unsavedDot]} />
      <Text style={styles.unsavedTitle}>
        {unsavedCount} {unsavedCount === 1 ? 'change' : 'changes'} not published
      </Text>
      <Button
        label={publishing ? 'Publishing…' : 'Publish'}
        size="compact"
        loading={publishing}
        onPress={onPublish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.panel, borderWidth: 1 },
  unsaved: {
    backgroundColor: colors.elevated,
    borderColor: colors.borderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.control,
    paddingHorizontal: spacing.md,
  },
  published: {
    backgroundColor: colors.successBackground,
    borderColor: colors.successBorder,
    padding: spacing.md,
    gap: spacing.xs,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4 },
  unsavedDot: { backgroundColor: colors.text },
  publishedDot: { backgroundColor: colors.success },
  unsavedTitle: { ...typography.label, color: colors.text, flex: 1 },
  publishedTitle: { ...typography.label, color: colors.success },
  caption: { ...typography.caption, color: colors.muted },
});
