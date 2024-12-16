import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  ChoppScreenLayout,
  FETCH_STATUS,
  ChoppAnimatedList,
  ChoppCollapsibleCard,
  ChoppChip,
  ChoppViewItems,
} from "@/shared";
import { ChoppOrderStatusChip } from "@/shared/components/chopp-order-status-chip";
import { fetchMyOrders } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function OrderHistory() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { myOrders, fetchMyOrdersStatus } = useSelector(
    (state: RootState) => state.order,
  );

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, []);

  // TODO: дабавить превью текста заказа
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ChoppScreenLayout
          showBackButton
          loading={fetchMyOrdersStatus === FETCH_STATUS.LOADING}
        >
          {myOrders && (
            <ChoppAnimatedList
              data={myOrders}
              renderItem={(item) => (
                <ChoppCollapsibleCard
                  title={
                    <>
                      <ChoppOrderStatusChip
                        style={{ width: 120 }}
                        status={item.statusData?.status}
                      />{" "}
                      <ChoppChip clear>
                        {item.statusData?.timeStamp &&
                          new Date(
                            item.statusData?.timeStamp,
                          ).toLocaleDateString()}
                      </ChoppChip>
                    </>
                  }
                >
                  <ChoppViewItems
                    items={{
                      [t("orderAddress")]: item.address,
                      [t("orderComment")]: item.orderComment,
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  backgroundIcon: {
    position: "absolute",
    right: -80,
    bottom: 160,
    opacity: 0.1,
  },
  content: {
    // width: "90%",
    // flex: 1
    // flexBasis: "80%",
  },
});
