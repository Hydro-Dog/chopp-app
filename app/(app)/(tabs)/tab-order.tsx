import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { OrderCard } from "@/components/order";
import { ChoppThemedText } from "@/shared";
import { fetchMyOrders, Order } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function TabOrder() {
  const { myOrders } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  const [unfinishedOrders, setUnfinishedOrders] = useState<Order[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    //Пока не показываются товары в запросе на последний по времени заказ (fetchLastOrder)
    dispatch(fetchMyOrders());
    console.log(myOrders);
  }, []);
  useEffect(() => {
    if (myOrders) {
      setUnfinishedOrders(myOrders.filter((item) => item.orderStatus !== "delivered"));
    }
  }, [myOrders]);
  return (
    <>
      {unfinishedOrders.length ? (
        <OrderCard order={unfinishedOrders[0]} />
      ) : (
        <View style={styles.empty}>
          <ChoppThemedText style={styles.emptyText}>{t("noOrdersInProcessing")}</ChoppThemedText>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    fontWeight: "100",
  },
});
