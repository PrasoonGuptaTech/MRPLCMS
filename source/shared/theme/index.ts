import type { TextStyle } from 'react-native';

export const colors = {
  primary: '#630ED4',
  muted: '#6B7280',
  surface: '#FFFFFF',
  text: '#111827',
} as const;

export const typography: Record<'tabLabel', TextStyle> = {
  tabLabel: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
};
