import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Order, ORDER_STATUS } from "@/shared";

type Props = {
  order: Order;
};

export const OrderScreenFooter = ({ order }: Props) => {
  const { t } = useTranslation();

  const makePayment = () => {
    if (order?.paymentUrl)
      Linking.openURL(order.paymentUrl).catch((err) => console.error("Ошибка открытия ссылки:", err));
  };

  if (order?.orderStatus !== ORDER_STATUS.AWAITING_PAYMENT) return null;

  return (
    <Button style={styles.button} mode="contained" onPress={makePayment}>
      {t("makePayment")}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
});
