import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';

import { Icon } from '@/icons';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
        tabBarBackground:
          Platform.OS === 'ios'
            ? () => (
                <BlurView
                  tint={colorScheme}
                  intensity={70}
                  style={StyleSheet.absoluteFill}
                />
              )
            : undefined,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <View className="pt-2 ">
              <Icon name="command" color={color} size={21} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(components)"
        options={{
          tabBarBadge: 1,
          title: 'Components',
          tabBarIcon: ({ color }) => (
            <View className="pt-2">
              <Icon name="command" color={color} size={21} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
