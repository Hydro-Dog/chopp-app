import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ChoppThemedView } from "./chopp-themed-view";
import { COLORS } from "@/constants/colors";
import { ChoppThemedText } from "./chopp-themed-text";

export function ChoppCollapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ChoppThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={theme === "light" ? COLORS.light.icon : COLORS.dark.icon}
        />
        <ChoppThemedText type="defaultSemiBold">{title}</ChoppThemedText>
      </TouchableOpacity>
      {isOpen && (
        <ChoppThemedView style={styles.content}>{children}</ChoppThemedView>
      )}
    </ChoppThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
