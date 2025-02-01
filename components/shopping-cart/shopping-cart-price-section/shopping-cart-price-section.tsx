import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Linking } from "react-native";
import { Banner, Button } from "react-native-paper";
import { useBoolean } from "usehooks-ts";
import { ChoppThemedText, Order, useSuperDispatch } from "@/shared";
import { createOrder } from "@/store/slices/order-slice";
import { ShoppingCart } from "@/store/slices/shopping-cart-slice";

type Props = {
  shoppingCart: ShoppingCart;
};

export const ShoppingCartPriceSection = ({ shoppingCart }: Props) => {
  const { t } = useTranslation();
  const { value: isBannerVisible, setTrue: showBanner, setFalse: hideBanner } = useBoolean();
  const [bannerMessage, setBannerMessage] = useState("");
  const { superDispatch } = useSuperDispatch<Order, unknown>();

  const onCommitOrder = () => {
    superDispatch({
      action: createOrder(),
      thenHandler: (order) => {
        Linking.openURL(order.paymentUrl).catch((err) => console.error("Ошибка открытия ссылки:", err));
      },
      catchHandler: (err) => {
        setBannerMessage(err.message);
        showBanner();
      },
    });
  };

  const onHideBannerPress = () => {
    hideBanner();
    setBannerMessage("");
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <Banner
        visible={isBannerVisible}
        actions={[
          {
            label: t("ok"),
            onPress: onHideBannerPress,
          },
        ]}
      >
        <ChoppThemedText>{bannerMessage}</ChoppThemedText>
      </Banner>
      <View style={styles.priceAndButton}>
        <ChoppThemedText style={{ fontSize: 20 }}>
          {shoppingCart.totalPrice}
          {t("currency")}
        </ChoppThemedText>
        <Button style={styles.buyButton} mode="contained" onPress={onCommitOrder}>
          {t("toOrder")}
        </Button>
      </View>
      {/* TODO Нужно будет добавить в переводчик, когда будем с Артемом соеденять */}
      <ChoppThemedText style={{ fontSize: 12, textAlign: "center" }}>
        Закажите еще на n рублей, для бесплатной доставки
      </ChoppThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  priceAndButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 15,
    paddingBlock: 10,
  },
  buyButton: {
    marginHorizontal: 15,
  },
});
