import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { CallStatusScreen, NewOrderForm } from "@/components/main";
import { CurrentOrderDetails } from "@/components/main/current-order-details";
import { ChoppThemedText, FETCH_STATUS, WS_MESSAGE_TYPE } from "@/shared";
import ChoppScreenLayout from "@/shared/components/chopp-screen-layout";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";
import { useFilterWsMessages } from "@/shared/hooks";
import { OrderStatus } from "@/shared/types/order-status";
import { fetchOrder, Order } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function TabHome() {
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
    <KeyboardAwareScrollView>
      <ChoppScreenLayout loading={fetchOrderStatus === FETCH_STATUS.LOADING}>
        <View style={styles.container}>
          {currentOrderData ? (
            <>
              <CallStatusScreen
                currentStatus={currentOrderData?.statusData?.status}
                timeStamp={currentOrderData?.statusData?.timeStamp}
              />

              <CurrentOrderDetails order={currentOrderData} />
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
      </ChoppScreenLayout>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 64,
    alignItems: "center",
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
