import { View, StyleSheet } from "react-native";
import { ChoppViewItem } from "@/pages/settings/profile/components";

export const ChoppViewItems = ({ items }: Record<string, any>) => {
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        {Object.entries(items).map(([key, val]) => (
          <ChoppViewItem key={key} title={key} label={String(val)} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexBasis: "100%" },
  items: {
    gap: 16,
  },
});
