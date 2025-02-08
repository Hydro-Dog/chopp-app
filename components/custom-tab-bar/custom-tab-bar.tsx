import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { router, usePathname } from "expo-router";
import { routes } from "@/constants/tab-routes";
import { useChoppTheme } from "@/shared";

export const CustomTabBar = () => {
  const [indexOfRoute, setIndexOfRoute] = useState(0);
  const { theme } = useChoppTheme();
  const pathname = usePathname();

  const choseTab = (index: number, route: string) => {
    setIndexOfRoute(index);
    router.navigate(route as any);
  };

  return pathname === "/login" || pathname === "/registration" ? null : (
    <View style={[styles.container, { backgroundColor: theme.colors.onSecondary }]}>
      {routes.map((item, index) => (
        <IconButton
          key={index}
          icon={indexOfRoute === index ? item.activeIcon : item.icon}
          iconColor={theme.colors.onSurface}
          size={35}
          onPress={() => choseTab(index, item.route)}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
