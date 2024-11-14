import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { ChoppCallStatusScreen } from "@/pages/main";
import { CurrentOrderDetails } from "@/pages/main/current-order-details";
import { NewOrderForm } from "@/pages/new-order";
import {
  ChoppThemedText,
  FETCH_STATUS,
  useChoppTheme,
  WS_MESSAGE_TYPE,
} from "@/shared";
import { useFilterWsMessages } from "@/shared/hooks";
import { OrderStatus } from "@/shared/types/order-status";
import { fetchOrder, Order } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function MainPage() {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const [currentOrderData, setCurrentOrderData] = useState<Order>();

  const dispatch = useDispatch<AppDispatch>();
  const { currentOrder, fetchOrderStatus } = useSelector(
    (state: RootState) => state.order,
  );

  const { lastMessage } = useFilterWsMessages<OrderStatus>(
    WS_MESSAGE_TYPE.ORDER_STATUS,
  );

  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  useEffect(() => {
    if (lastMessage && currentOrder) {
      setCurrentOrderData({
        ...currentOrder,
        statusData: lastMessage.payload,
      });
    } else if (currentOrder) {
      setCurrentOrderData({
        ...currentOrder,
      });
    }
  }, [currentOrder, lastMessage]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        justifyContent: "center",
        display: "flex",
        height: "100%",
        flexDirection: "row",
      }}
    >
      {fetchOrderStatus === FETCH_STATUS.LOADING && (
        <ActivityIndicator style={styles.activityIndicator} />
      )}
      <View style={styles.container}>
        {currentOrderData ? (
          <>
            <ChoppCallStatusScreen
              currentStatus={currentOrderData.statusData.status}
              timeStamp={currentOrderData.statusData.timeStamp}
            />
            {currentOrderData && (
              <CurrentOrderDetails order={currentOrderData} />
            )}
          </>
        ) : (
          <>
            <Image
              style={styles.logo}
              source={theme.dark ? LogoDark : LogoLight}
            />
            <View style={styles.content}>
              <ChoppThemedText type="subtitleBold">
                {t("order")}
              </ChoppThemedText>
              <NewOrderForm />
            </View>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    // height: "100%",
    flexDirection: "column",
    // justifyContent: 'center',
    alignItems: "center",
    marginTop: 64,
  },
  logo: {
    width: 128,
    height: 128,
  },
  content: {
    width: "100%",
  },
  loginButton: {
    marginTop: 20,
    width: "100%",
  },
  activityIndicator: {
    position: "absolute",
    top: 40,
    right: 40,
  },
});
