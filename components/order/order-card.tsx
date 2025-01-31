import { useTranslation } from "react-i18next";
import { Linking, View } from "react-native";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";
import { OrderGoodsCard } from "./order-goods-card";
import { ChoppScreenLayout, ChoppThemedText } from "@/shared";
import { Order } from "@/store/slices/order-slice";

interface Props {
  order: Order;
}

export const OrderCard = ({ order }: Props) => {
  const { t } = useTranslation();

  const makePayment = () => {
    if (order?.paymentUrl)
      Linking.openURL(order.paymentUrl).catch((err) => console.error("Ошибка открытия ссылки:", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <ChoppThemedText style={styles.title}>
          {t("order")} № {order?.id}
        </ChoppThemedText>
        <ChoppThemedText>
          {t("statusOfOrder")}: {t(`${order?.orderStatus}`)}
        </ChoppThemedText>
        <ChoppThemedText>
          {t("inAll")}: {order?.totalPrice} {t("currency")}
        </ChoppThemedText>
        <ChoppThemedText>{t("goods")}:</ChoppThemedText>
      </View>

      <ChoppScreenLayout>
        <View style={styles.row}>
          <FlatList
            data={order.items}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            renderItem={({ item }) => <OrderGoodsCard item={item} />}
          />
        </View>
      </ChoppScreenLayout>

      {order?.orderStatus === "awaitingPayment" && (
        <Button style={styles.button} mode="contained" onPress={() => makePayment()}>
          {t("makePayment")}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  info: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  container: {
    paddingInline: 20,
    paddingTop: 20,
    flex: 1,
  },
});
