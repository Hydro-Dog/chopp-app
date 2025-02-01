import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { ChoppThemedText } from "@/shared";
import { Order } from "@/shared";

type Props = {
  order: Order;
};

export const OrderScreenHeader = ({ order }: Props) => {
  const { t } = useTranslation();

  return (
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
  );
};

const styles = StyleSheet.create({
  info: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});
