import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { CallStatusScreen, NewOrderForm, useGetProducts } from "@/components/main";
import { CurrentOrderDetails } from "@/components/main/current-order-details";
import { TextInput, Appbar  } from 'react-native-paper';

import {
  ChoppThemedText,
  FETCH_STATUS,
  OrderStatus,
  useChoppTheme,
  useFilterWsMessages,
  WS_MESSAGE_TYPE,
  ChoppScreenLayout,
  URLs,
} from "@/shared";
import { fetchOrder, Order } from "@/store/slices/order-slice";
import { AppDispatch, RootState } from "@/store/store";
import {CardForProducts} from "@/components/main"
import { fetchImages, ImageItem } from "@/store/slices/images-slice";

export default function TabHome() {
  const images = useSelector<RootState, ImageItem[]>((state) => state.images.items);
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
  useEffect(()=>{
    dispatch(fetchImages())
  },[])
  
  return (
    <>
      <Appbar.Header>
        <TextInput
        label="Поиск"
        value={''}
        activeUnderlineColor="grey"
        style={{width:"100%"}}
      />
      </Appbar.Header>
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
              <FlatList
                  data={images}
                  keyExtractor={(item) => item.title}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <CardForProducts
                      title={item.title}
                      description={item.description}
                      URL={ `${URLs.urlForImages+item.images}`}
                      price={String(item.price)}
                    />
                  )}
                  />
              </>
            )}
          </View>
        </ChoppScreenLayout>
      </KeyboardAwareScrollView>
    </>
    
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
