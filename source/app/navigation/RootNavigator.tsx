import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from '../../assets/svg/Home.svg';
import HomeStackNavigator from '../../features/home/navigation/HomeStackNavigator';
import ProfileStackNavigator from '../../features/profile/navigation/ProfileStackNavigator';
import { colors, typography } from '../../shared/theme';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabScreenOptions = {
  headerShown: false,
  lazy: true,
  freezeOnBlur: true,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.muted,
  tabBarLabelStyle: typography.tabLabel,
} as const;

const homeTabOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: HomeTabIcon,
} as const;

const profileTabOptions = { tabBarLabel: 'Profile' } as const;

function HomeTabIcon({ color }: { color: string }) {
  return <HomeIcon width={18} height={18} color={color} />;
}

export default function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={homeTabOptions}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={profileTabOptions}
      />
    </Tab.Navigator>
  );
}
