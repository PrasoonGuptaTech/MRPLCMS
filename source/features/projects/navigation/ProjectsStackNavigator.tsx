import { createStackNavigator } from '@react-navigation/stack';
import type { ProjectsStackParamList } from '../../../app/navigation/types';
import ProjectsScreen from '../screens/ProjectsScreen';

const Stack = createStackNavigator<ProjectsStackParamList>();

export default function ProjectsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Projects" component={ProjectsScreen} />
    </Stack.Navigator>
  );
}
