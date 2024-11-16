import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Tabs } from "expo-router";

import {
  useFetchChatStats,
  useFetchMessages,
  useReadAllChatMessages,
} from "./hooks";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ChatMessage, useChoppTheme, WS_MESSAGE_TYPE } from "@/shared";
import { useChatsContext } from "@/shared/context/chats-context";
import { useFilterWsMessages } from "@/shared/hooks";
import { fetchCurrentUser } from "@/store/slices/user-slice";
import { AppDispatch } from "@/store/store";

export default function TabLayout() {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(
    WS_MESSAGE_TYPE.MESSAGE,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { chatStats, setChatStats } = useChatsContext();

  useFetchMessages();
  useFetchChatStats();
  useReadAllChatMessages();

  //TODO: вынести в хук
  useEffect(() => {
    setChatStats((prev) => {
      return {
        ...prev,
        unRead: prev.unRead + 1,
        total: prev.total + 1,
      };
    });
  }, [newMessage]);

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
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tab-support-chat"
        options={{
          title: t("supportPage"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              color={color}
              badge={chatStats?.unRead ? chatStats?.unRead : ""}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tab-control-panel"
        options={{
          title: t("controlPanel"),
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
        name="tab-logout"
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
