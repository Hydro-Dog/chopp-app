import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { router, usePathname } from "expo-router";
import { ROUTES_TABS_MAP } from "./constants/tab-routes";
import { ROUTES, useChoppTheme } from "@/shared";

export const ChoppTabBar = () => {
  const [currentTab, setCurrentTab] = useState("");
  const { theme } = useChoppTheme();
  const pathname = usePathname();

  const choseTab = (key: ROUTES) => {
    setCurrentTab(key);
    router.navigate(key);
  };

  useEffect(() => {
    console.log("pathname: ", pathname);
    const rootTab = pathname.split("/")[1] as ROUTES;
    setCurrentTab(`/${rootTab}`);
  }, []);

  return (
    pathname !== ROUTES.LOGIN &&
    pathname !== ROUTES.REGISTRATION && (
      <View style={[styles.container, { backgroundColor: theme.colors.onSecondary }]}>
        {Object.entries(ROUTES_TABS_MAP).map(([key, value], index) => (
          <IconButton
            key={index}
            icon={(value?.routes.includes(currentTab)) ? value.activeIcon : value.icon}
            iconColor={theme.colors.secondary}
            size={23}
            onPress={() => choseTab(key as ROUTES)}
          />
        ))}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
