import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, SafeAreaView, StatusBar, View, FlatList } from "react-native";
import { Icon } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { OrderHistoryProductCard } from "@/components/settings/order-history";
import {
  ChoppScreenLayout,
  FETCH_STATUS,
  ChoppAnimatedList,
  ChoppCollapsibleCard,
  ChoppChip,
  ChoppViewItems,
  ORDER_STATUS,
} from "@/shared";
import { ChoppOrderStatusChip } from "@/shared/components/chopp-order-status-chip";
import { fetchOrders } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function OrderHistory() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { orders, fetchMyOrdersStatus } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ChoppScreenLayout showBackButton loading={fetchMyOrdersStatus === FETCH_STATUS.LOADING}>
          {orders && (
            <ChoppAnimatedList
              data={orders}
              renderItem={(item) => (
                <ChoppCollapsibleCard
                  left={() =>
                    //TODO Когда определимся со статусами заказов - поставлю switch, где для каждого статуса будет своя иконка
                    item.orderStatus === ORDER_STATUS.DELIVERED ? (
                      <Icon source="check" size={20} />
                    ) : (
                      <Icon source="timer-sand" size={20} />
                    )
                  }
                  title={
                    <>
                      {/* <ChoppOrderStatusChip style={{ width: 120 }} status={item.orderStatus} />{" "} */}
                      <ChoppChip clear>{item.createdAt && new Date(item.createdAt).toLocaleDateString()}</ChoppChip>
                      <ChoppChip clear>
                        {t("order")} : {item.id}
                      </ChoppChip>
                    </>
                  }
                >
                  <ChoppViewItems
                    items={{
                      [t("inAll")]: item.totalPrice + t("currency"),
                      [t("countOfGoods")]: item.quantity + t("count"),
                      [t("orderComment")]: (
                        <View style={styles.list}>
                          <FlatList
                            data={item.items}
                            horizontal
                            keyExtractor={(item) => item.product.id.toString()}
                            renderItem={({ item }) => <OrderHistoryProductCard item={item} />}
                            showsHorizontalScrollIndicator={false}
                          />
                        </View>
                      ),
                    }}
                  />
                </ChoppCollapsibleCard>
              )}
            />
          )}
        </ChoppScreenLayout>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
