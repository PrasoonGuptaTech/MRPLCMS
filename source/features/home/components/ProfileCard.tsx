import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../shared/components/Button';
import { colors, radius, spacing, typography } from '../../../shared/theme';

type Props = {
  initials: string;
  name: string;
  role: string;
  onEdit: () => void;
};

export function ProfileCard({ initials, name, role, onEdit }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
      <Button
        label="Edit"
        variant="secondary"
        size="compact"
        onPress={onEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stack,
    padding: spacing.md,
    borderRadius: radius.panel,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.card,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.avatar,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.label, color: colors.text, fontSize: 16 },
  info: { flex: 1, gap: 2 },
  name: { ...typography.label, color: colors.text, fontSize: 16 },
  role: { ...typography.caption, color: colors.muted },
});
