import { View, StyleSheet } from "react-native";
import { ChoppViewItem } from "@/components/settings/profile/components";

export const ChoppViewItems = ({ items }: Record<string, any>) => {
  return (
    <View style={styles.items}>
      {Object.entries(items).map(([key, val]) => (
        <ChoppViewItem key={key} title={key} label={String(val)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    flex: 1,
    gap: 8,
  },
});
