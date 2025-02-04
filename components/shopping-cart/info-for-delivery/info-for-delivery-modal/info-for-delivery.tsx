import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Linking } from "react-native";
import { Banner, Button, IconButton, Portal } from "react-native-paper";
import { useBoolean } from "usehooks-ts";
import { InfoForDeliveryForm } from "../info-for-delivery-form";
import { ChoppThemedText, Order, useChoppTheme, useSuperDispatch } from "@/shared";
import { createOrder } from "@/store/slices/order-slice";
import { ShoppingCart } from "@/store/slices/shopping-cart-slice";

type Props = {
  shoppingCart: ShoppingCart;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InfoForDeliveryModal = ({ shoppingCart, setVisible }: Props) => {
  const { t } = useTranslation();
  const { theme } = useChoppTheme();
  const { superDispatch } = useSuperDispatch<Order, unknown>();
  const { value: isBannerVisible, setTrue: showBanner, setFalse: hideBanner } = useBoolean();
  const [bannerMessage, setBannerMessage] = useState("");

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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <IconButton
        style={styles.closeButton}
        icon="close"
        iconColor={theme.colors.primary}
        size={20}
        onPress={() => setVisible(false)}
      />

      <InfoForDeliveryForm />

      <ChoppThemedText>
        {t("inAll")}: {shoppingCart.totalPrice}
        {t("currency")}
      </ChoppThemedText>
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
      <Button mode="contained" style={styles.saveButton} onPress={onCommitOrder}>
        {t("makePayment")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: "flex-end",
  },
  container: {
    margin: 10,
    paddingInline: 10,
    paddingBlock: 20,
    borderRadius: 10,
  },
  saveButton: {
    marginVertical: 10,
    alignSelf: "flex-end",
  },
});
