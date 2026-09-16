import type { TextStyle } from 'react-native';

// CMS 2026 / Design System / Foundations (Figma 1:18909).
export const colors = {
  background: '#0A0A0B',
  surface: '#101114',
  field: '#101113',
  card: '#16171A',
  elevated: '#1D1E22',
  borderSubtle: '#24262B',
  border: '#2E3036',
  borderStrong: '#3A3D44',
  text: '#FAFAFA',
  secondary: '#C9CACE',
  muted: '#A1A1A6',
  tertiary: '#8B8D93',
  placeholder: '#6C6E75',
  primary: '#FAFAFA',
  primaryPressed: '#E4E5E7',
  success: '#6EE7A8',
  warning: '#E9B87A',
  error: '#F98A8A',
} as const;
export const spacing = {
  xs: 6,
  sm: 10,
  stack: 12,
  control: 14,
  md: 16,
  gutter: 18,
  lg: 24,
  authGutter: 26,
  xl: 32,
} as const;
export const radius = {
  control: 12,
  logo: 14,
  card: 16,
  panel: 18,
  sheet: 20,
  pill: 999,
} as const;
export const heights = {
  input: 46,
  button: 50,
  loginButton: 54,
  headerAction: 40,
  chip: 34,
  row: 56,
} as const;
export const fonts = {
  regular: 'Figtree-Regular',
  medium: 'Figtree-Medium',
  semibold: 'Figtree-SemiBold',
} as const;
export const typography = {
  display: { fontFamily: fonts.semibold, fontSize: 30, lineHeight: 38 },
  heading: { fontFamily: fonts.semibold, fontSize: 24, lineHeight: 32 },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  input: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 20 },
  label: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 18 },
  button: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18 },
  tabLabel: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16 },
} satisfies Record<string, TextStyle>;
