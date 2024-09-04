import React from "react";
import { Tabs } from "expo-router";

import { TabBarIcon } from "@/pages/navigation/TabBarIcon";
import { useChoppTheme } from "@/shared";

export default function TabLayout() {
  const { theme } = useChoppTheme();

  console.log('TabLayout theme.dark: ', theme.dark, theme.colors?.background)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cafe" : "cafe-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
