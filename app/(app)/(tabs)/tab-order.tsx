import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Linking } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ChoppThemedText } from "@/shared";
import { fetchLastOrder } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function TabOrder() {
  const { t } = useTranslation();
  const { currentOrder } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLastOrder());
  }, []);
  const makePayment = () => {
    if (currentOrder?.paymentUrl)
      Linking.openURL(currentOrder.paymentUrl).catch((err) => console.error("Ошибка открытия ссылки:", err));
  };
  return (
    <>
      <View style={styles.container}>
        <ChoppThemedText style={styles.title}>
          {t("order")} № {currentOrder?.id}
        </ChoppThemedText>
        <ChoppThemedText>
          {t("statusOfPayment")}: {t(`${currentOrder?.orderStatus}`)}
        </ChoppThemedText>
        <ChoppThemedText>
          {t("inAll")}: {currentOrder?.totalPrice} {t("currency")}
        </ChoppThemedText>
        {currentOrder?.paymentStatus === "pending" && (
          <Button mode="contained" onPress={() => makePayment()}>
            {t("makePayment")}
          </Button>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
