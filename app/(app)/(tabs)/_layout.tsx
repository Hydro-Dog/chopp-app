import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Tabs } from "expo-router";
import useFetchMessages from "@/hooks/use-fetch-messages";
import { useChoppTheme } from "@/shared";
import { TabBarIcon } from "@/shared/components/chopp-tab-bar-icon";
import { fetchCurrentUser } from "@/store/slices/user-slice";
import { AppDispatch } from "@/store/store";

export default function TabLayout() {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useFetchMessages();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "grid" : "grid-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab-order"
        options={{
          title: t("order"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "bag-handle" : "bag-handle-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tab-support-chat"
        options={{
          title: t("supportPage"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tab-control-panel"
        options={{
          title: t("controlPanel"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "settings" : "settings-outline"} color={color} />
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
        name="tab-logout"
        options={{
          title: t("logoutPage"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "log-out" : "log-out-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
