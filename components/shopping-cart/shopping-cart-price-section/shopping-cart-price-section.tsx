import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ChoppThemedText } from "@/shared";
import { ShoppingCart } from "@/store/slices/shopping-cart-slice";

type Props = {
  shoppingCart: ShoppingCart;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
};

export const ShoppingCartPriceSection = ({ shoppingCart, setVisible }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.priceAndButton}>
        <ChoppThemedText style={{ fontSize: 20 }}>
          {shoppingCart.totalPrice}
          {t("currency")}
        </ChoppThemedText>
        <Button style={styles.buyButton} mode="contained" onPress={() => setVisible(true)}>
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
