import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Project } from '../data';
import { SwitchProjectRow } from './SwitchProjectRow';
import ChevronLeftIcon from '../../../assets/svg/ChevronLeft.svg';
import SearchIcon from '../../../assets/svg/Search.svg';
import IconPlusDark from '../../../assets/svg/IconPlusDark.svg';
import {
  colors,
  heights,
  radius,
  spacing,
  typography,
} from '../../../shared/theme';

type Props = {
  visible: boolean;
  projects: Project[];
  activeProjectId: string | null;
  onClose: () => void;
  onSelectProject: (id: string) => void;
  onCreateProject: () => void;
};

export function SwitchProjectSheet({
  visible,
  projects,
  activeProjectId,
  onClose,
  onSelectProject,
  onCreateProject,
}: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return projects;
    return projects.filter(
      project =>
        project.name.toLowerCase().includes(needle) ||
        project.owner.toLowerCase().includes(needle) ||
        project.tags.some(tag => tag.toLowerCase().includes(needle)),
    );
  }, [projects, query]);

  const recentProjects = filtered.filter(project => project.recent);
  const allProjects = filtered.filter(project => !project.recent);

  function selectAndClose(id: string) {
    onSelectProject(id);
    setQuery('');
  }

  function createAndClose() {
    onCreateProject();
    setQuery('');
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          accessibilityRole="button"
          accessibilityLabel="Close switch project"
          onPress={onClose}
        />
        <SafeAreaView edges={['bottom']} style={styles.sheet}>
          <View style={styles.handleRow}>
            <View style={styles.handle} />
          </View>
          <View style={styles.headerRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              hitSlop={8}
              style={styles.backButton}
              onPress={onClose}
            >
              <ChevronLeftIcon width={17} height={17} color={colors.text} />
            </Pressable>
            <View style={styles.headerText}>
              <Text style={styles.title}>Switch project</Text>
              <Text style={styles.subtitle}>
                {projects.length} projects in this account
              </Text>
            </View>
          </View>
          <View style={styles.searchField}>
            <SearchIcon width={17} height={17} color={colors.placeholder} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name, client or tag"
              placeholderTextColor={colors.placeholder}
              accessibilityLabel="Search projects"
              style={styles.searchInput}
            />
          </View>
          <View style={styles.list}>
            {recentProjects.length > 0 && (
              <View style={styles.group}>
                <View style={styles.groupHeader}>
                  <Text style={styles.groupTitle}>Recent</Text>
                  <Text style={styles.groupCount}>{recentProjects.length}</Text>
                </View>
                <View style={styles.groupList}>
                  {recentProjects.map(project => (
                    <SwitchProjectRow
                      key={project.id}
                      project={project}
                      active={project.id === activeProjectId}
                      onPress={() => selectAndClose(project.id)}
                    />
                  ))}
                </View>
              </View>
            )}
            {allProjects.length > 0 && (
              <View style={styles.group}>
                <View style={styles.groupHeader}>
                  <Text style={styles.groupTitle}>All projects</Text>
                  <Text style={styles.groupCount}>{allProjects.length}</Text>
                </View>
                <View style={styles.groupList}>
                  {allProjects.map(project => (
                    <SwitchProjectRow
                      key={project.id}
                      project={project}
                      active={project.id === activeProjectId}
                      onPress={() => selectAndClose(project.id)}
                    />
                  ))}
                </View>
              </View>
            )}
            {filtered.length === 0 && (
              <Text style={styles.empty}>No projects match “{query}”.</Text>
            )}
          </View>
          <View style={styles.footer}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create new project"
              style={({ pressed }) => [
                styles.createButton,
                pressed && styles.createButtonPressed,
              ]}
              onPress={createAndClose}
            >
              <IconPlusDark width={18} height={18} />
              <Text style={styles.createLabel}>Create new project</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet + 6,
    borderTopRightRadius: radius.sheet + 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 0,
  },
  handleRow: { alignItems: 'center', paddingTop: spacing.sm },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stack,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.control,
  },
  backButton: {
    width: 28,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: { flex: 1, gap: 2 },
  title: { ...typography.heading, color: colors.text, fontSize: 20 },
  subtitle: { ...typography.caption, color: colors.muted },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: heights.input,
    marginHorizontal: spacing.gutter,
    marginTop: spacing.control,
    paddingHorizontal: spacing.control,
    borderRadius: radius.control + 1,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.card,
  },
  searchInput: {
    ...typography.input,
    flex: 1,
    color: colors.text,
    padding: 0,
    includeFontPadding: false,
  },
  list: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter,
    paddingBottom: spacing.md,
    gap: spacing.gutter,
  },
  group: { gap: spacing.sm },
  groupHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  groupTitle: {
    ...typography.caption,
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  groupCount: {
    ...typography.caption,
    color: colors.placeholder,
    fontSize: 11,
  },
  groupList: { gap: spacing.sm },
  empty: {
    ...typography.caption,
    color: colors.muted,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.control,
    paddingBottom: spacing.md,
  },
  createButton: {
    flexDirection: 'row',
    gap: spacing.sm,
    height: heights.button,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.panel - 4,
    backgroundColor: colors.primary,
  },
  createButtonPressed: { backgroundColor: colors.primaryPressed },
  createLabel: { ...typography.button, fontSize: 15, color: colors.background },
});
