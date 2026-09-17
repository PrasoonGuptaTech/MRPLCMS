import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '../../features/home/navigation/HomeStackNavigator';
import MediaStackNavigator from '../../features/media/navigation/MediaStackNavigator';
import MoreStackNavigator from '../../features/more/navigation/MoreStackNavigator';
import ProjectsStackNavigator from '../../features/projects/navigation/ProjectsStackNavigator';
import CustomTabBar from './CustomTabBar';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabScreenOptions = {
  headerShown: false,
  lazy: true,
  freezeOnBlur: true,
} as const;

function renderTabBar(props: BottomTabBarProps) {
  return <CustomTabBar {...props} />;
}

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions} tabBar={renderTabBar}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="ProjectsTab"
        component={ProjectsStackNavigator}
        options={{ tabBarLabel: 'Projects' }}
      />
      <Tab.Screen
        name="MediaTab"
        component={MediaStackNavigator}
        options={{ tabBarLabel: 'Media' }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreStackNavigator}
        options={{ tabBarLabel: 'More' }}
      />
    </Tab.Navigator>
  );
}
