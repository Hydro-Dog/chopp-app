import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { InfoForDeliveryForm } from "../info-for-delivery-form";
import { ChoppThemedText, useChoppTheme } from "@/shared";
import { ShoppingCart } from "@/store/slices/shopping-cart-slice";

type Props = {
  shoppingCart: ShoppingCart;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InfoForDeliveryModal = ({ shoppingCart, setVisible }: Props) => {
  const { t } = useTranslation();
  const { theme } = useChoppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <IconButton
        style={styles.closeButton}
        icon="close"
        iconColor={theme.colors.primary}
        size={20}
        onPress={() => setVisible(false)}
      />

      <ChoppThemedText>
        {t("inAll")}: {shoppingCart.totalPrice}
        {t("currency")}
      </ChoppThemedText>

      <InfoForDeliveryForm />
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
});
