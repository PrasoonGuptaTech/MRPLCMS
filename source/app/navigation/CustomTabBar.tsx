import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabHomeIcon from '../../assets/svg/TabHome.svg';
import TabMediaIcon from '../../assets/svg/TabMedia.svg';
import TabMoreIcon from '../../assets/svg/TabMore.svg';
import TabProjectsIcon from '../../assets/svg/TabProjects.svg';
import { colors, fonts } from '../../shared/theme';
import type { RootTabParamList } from './types';

const TAB_ICONS: Record<keyof RootTabParamList, typeof TabHomeIcon> = {
  HomeTab: TabHomeIcon,
  ProjectsTab: TabProjectsIcon,
  MediaTab: TabMediaIcon,
  MoreTab: TabMoreIcon,
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const Icon = TAB_ICONS[route.name as keyof RootTabParamList];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            {isFocused && <View style={styles.activeIndicator} />}
            <Icon
              width={21}
              height={21}
              color={isFocused ? colors.text : colors.tertiary}
            />
            <Text style={isFocused ? styles.labelActive : styles.labelInactive}>
              {label as string}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 10, 11, 0.95)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.elevated,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    alignSelf: 'center',
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.text,
  },
  labelActive: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    lineHeight: 14,
    color: colors.text,
  },
  labelInactive: {
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 14,
    color: colors.tertiary,
  },
});
