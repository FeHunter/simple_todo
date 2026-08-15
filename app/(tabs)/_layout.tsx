import { IconSymbol } from '@/components/ui/icon-symbol';
import colors from '@/constants/colors';
import { Tabs } from 'expo-router';
import React from 'react';

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
          tabBarIcon: ({ color }) => (
            <IconSymbol
                size={24}
                name="checklist"
                color={color}
            />
        )
        }}
      />
      <Tabs.Screen
        name="tasksDone"
        options={{
          title: 'Taks Done',
          tabBarIcon: ({ color }) => (
            <IconSymbol
                size={24}
                name="circle.badge.questionmark.fill"
                color={color}
            />
        )
        }}
      />
    </Tabs>
  );
}
