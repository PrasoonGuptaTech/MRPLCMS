import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ChevronDownIcon from '../../../assets/svg/ChevronDown.svg';
import SearchIcon from '../../../assets/svg/Search.svg';
import projectThumbnail from '../../../assets/ProjectThumbnail.png';
import { colors, radius, spacing, typography } from '../../../shared/theme';

type Props = {
  projectName: string;
  domain: string;
  itemCount: number;
  initials: string;
  onSwitchProject: () => void;
  onSearch: () => void;
  onAccount: () => void;
};

export function HomeHeader({
  projectName,
  domain,
  itemCount,
  initials,
  onSwitchProject,
  onSearch,
  onAccount,
}: Props) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        style={styles.project}
        onPress={onSwitchProject}
      >
        <Image source={projectThumbnail} style={styles.thumbnail} />
        <View style={styles.projectInfo}>
          <View style={styles.projectTitleRow}>
            <Text style={styles.projectName} numberOfLines={1}>
              {projectName}
            </Text>
            <ChevronDownIcon width={17} height={17} color={colors.muted} />
          </View>
          <Text style={styles.projectMeta} numberOfLines={1}>
            {domain} · {itemCount} items
          </Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Search"
        hitSlop={8}
        style={styles.iconButton}
        onPress={onSearch}
      >
        <SearchIcon width={21} height={21} color={colors.text} />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Account"
        hitSlop={8}
        style={[styles.iconButton, styles.accountButton]}
        onPress={onAccount}
      >
        <Text style={styles.accountText}>{initials}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  project: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minWidth: 0,
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.border,
  },
  projectInfo: { flex: 1, minWidth: 0, gap: 2 },
  projectTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  projectName: {
    ...typography.label,
    color: colors.text,
    fontSize: 18,
    flexShrink: 1,
  },
  projectMeta: { ...typography.caption, color: colors.muted },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.sheet,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountButton: {
    backgroundColor: colors.avatar,
    borderWidth: 1,
    borderColor: colors.border,
  },
  accountText: { ...typography.label, color: colors.text },
});
