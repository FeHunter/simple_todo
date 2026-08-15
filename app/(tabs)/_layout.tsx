import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
            display: 'none'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'To-do List',
          tabBarIcon: ({ color }) => <IconSymbol size={15} name="note.text" color={color} />,
        }}
      />
    </Tabs>
  );
}
