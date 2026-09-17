import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../../shared/theme';

export function HomeSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Portfolio</Text>
          <Text style={styles.caption}>Loading</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DD</Text>
        </View>
      </View>
      <View style={[styles.block, styles.blockSmall]} />
      <View style={[styles.block, styles.blockMedium]} />
      <View style={[styles.block, styles.blockLarge]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.stack },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.heading,
    fontSize: 20,
    lineHeight: 26,
    color: colors.text,
  },
  caption: { ...typography.caption, color: colors.muted, marginTop: 2 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.avatar,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.label, color: colors.text },
  block: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.elevated,
    backgroundColor: colors.skeleton,
  },
  blockSmall: { height: 62 },
  blockMedium: { height: 72 },
  blockLarge: { height: 300 },
});
