import colors from '@/constants/colors';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.textWhite,
        headerStyle: {
          backgroundColor: colors.main,
          borderWidth: 0,
          borderColor: colors.main,
        },
        animation: 'fade',
        sceneStyle: {
          backgroundColor: colors.main,
          borderWidth: 0,
        },
        tabBarActiveTintColor: colors.textWhite,
        tabBarStyle: {
          height: 'auto',
          minHeight: 50,
          backgroundColor: colors.main,
          borderColor: colors.main,
          borderWidth: 0,
            // display: 'none
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Taks to-do',
        }}
      />
      <Tabs.Screen
        name="tasksDone"
        options={{
          title: 'Taks Done',
        }}
      />
    </Tabs>
  );
}
