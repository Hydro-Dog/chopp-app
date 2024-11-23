import { View, StyleSheet } from "react-native";
import { ChoppViewItem } from "./chopp-view-item";

type Props = {
  items: Record<string, any>;
  loading?: boolean;
};

export const ChoppViewItems = ({ items, loading }: Props) => {
  return (
    <View style={styles.items}>
      {Object.entries(items).map(([key, val]) => (
        <ChoppViewItem
          loading={loading}
          key={key}
          title={key}
          label={String(val)}
        />
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
