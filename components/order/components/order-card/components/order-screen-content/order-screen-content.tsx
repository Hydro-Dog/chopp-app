import { View, StyleSheet, FlatList } from "react-native";
import { OrderCardItem } from "./components";
import { ChoppScreenLayout } from "@/shared";
import { Order } from "@/shared";

type Props = {
  order: Order;
};

export const OrderScreenContent = ({ order }: Props) => {
  return (
    <ChoppScreenLayout>
      <View style={styles.row}>
        <FlatList
          data={order.items}
          keyExtractor={(item) => item.product.id.toString()}
          numColumns={1}
          renderItem={({ item }) => <OrderCardItem item={item} />}
        />
      </View>
    </ChoppScreenLayout>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
  },
});
