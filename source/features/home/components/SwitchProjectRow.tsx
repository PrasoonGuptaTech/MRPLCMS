import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Project } from '../data';
import IconCheck from '../../../assets/svg/IconCheck.svg';
import { colors, radius, spacing, typography } from '../../../shared/theme';

type Props = {
  project: Project;
  active: boolean;
  onPress: () => void;
};

export function SwitchProjectRow({ project, active, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={project.name}
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [
        styles.row,
        active && styles.rowActive,
        pressed && styles.rowPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{project.initials}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {project.name}
          </Text>
          {active && (
            <View style={styles.checkBadge}>
              <IconCheck width={12} height={12} />
            </View>
          )}
        </View>
        <Text style={styles.meta} numberOfLines={1}>
          {project.owner} · {project.itemCount} items · {project.editedLabel}
        </Text>
        <View style={styles.tagsRow}>
          <View
            style={[
              styles.statusChip,
              project.status === 'published'
                ? styles.statusPublished
                : styles.statusDraft,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                project.status === 'published'
                  ? styles.statusPublishedText
                  : styles.statusDraftText,
              ]}
            >
              {project.status === 'published' ? 'Published' : 'Draft'}
            </Text>
          </View>
          {project.tags.map(tag => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.stack,
    padding: spacing.control,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.card,
  },
  rowActive: { borderColor: colors.text },
  rowPressed: { backgroundColor: colors.elevated },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.label, color: colors.secondary },
  info: { flex: 1, gap: spacing.xs, minWidth: 0 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  name: { ...typography.label, color: colors.text, flexShrink: 1 },
  checkBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { ...typography.caption, color: colors.muted },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexWrap: 'wrap',
  },
  statusChip: {
    height: 22,
    paddingHorizontal: spacing.sm,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPublished: {
    backgroundColor: colors.successBackground,
    borderColor: colors.successBorder,
  },
  statusDraft: {
    backgroundColor: colors.elevated,
    borderColor: colors.border,
  },
  statusText: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: typography.label.fontFamily,
  },
  statusPublishedText: { color: colors.success },
  statusDraftText: { color: colors.muted },
  tagChip: {
    height: 22,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    backgroundColor: colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: typography.body.fontFamily,
    color: colors.tertiary,
  },
});
