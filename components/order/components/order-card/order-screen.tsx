import { View, StyleSheet } from "react-native";
import { OrderScreenContent } from "./components/order-screen-content";
import { OrderScreenFooter } from "./components/order-screen-footer";
import { OrderScreenHeader } from "./components/order-screen-header";
import { Order } from "@/shared";

type Props = {
  order: Order;
};

export const OrderScreen = ({ order }: Props) => {
  return (
    <View style={styles.container}>
      <OrderScreenHeader order={order} />
      <OrderScreenContent order={order} />
      <OrderScreenFooter order={order} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingInline: 20,
    paddingTop: 20,
    flex: 1,
  },
});
