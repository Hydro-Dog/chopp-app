import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "expo-router";

import { TabBarIcon } from "@/pages/navigation/TabBarIcon";
import { useChoppTheme } from "@/shared";
import { View } from "react-native";

export default function TabLayout() {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          height: 90, // Adjust the height here
          paddingBottom: 30, // Adjust padding if needed
          paddingTop: 0, // Optional padding to make icons/text centered
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("mainPage"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "help-buoy" : "help-buoy-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t("supportPage"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settingsPage"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="dev"
        options={{
          title: "Dev",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="logout"
        options={{
          title: t("logoutPage"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "log-out" : "log-out-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
