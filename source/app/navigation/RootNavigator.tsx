import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from '../../assets/svg/Home.svg';
import HomeStackNavigator from '../../features/home/navigation/HomeStackNavigator';
import ProfileStackNavigator from '../../features/profile/navigation/ProfileStackNavigator';
import { colors, typography } from '../../shared/theme';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeTabIcon({ color }: { color: string }) {
  return <HomeIcon width={18} height={18} color={color} />;
}

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: typography.tabLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
