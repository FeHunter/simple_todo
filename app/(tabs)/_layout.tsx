import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
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
        tabBarInactiveTintColor: colors.notDone,
        tabBarStyle: {
          height: 'auto',
          minHeight: 60,
          backgroundColor: colors.main,
          borderColor: colors.main,
          borderWidth: 0,
            // display: 'none
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
              <Ionicons
                  name="list"
                  size={size}
                  color={color}
              />
          ),
        }}
        
      />
      <Tabs.Screen
        name="tasksDone"
        options={{
          title: 'Done',
          tabBarIcon: ({ color, size }) => (
              <Ionicons
                  name="checkmark-done"
                  size={size}
                  color={color}
              />
          ),
        }}
      />
    </Tabs>
  );
}
