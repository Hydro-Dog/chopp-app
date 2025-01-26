import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Badge, IconButton } from "react-native-paper";
import { COLORS } from "@/constants/colors";
import { ChoppThemedText, useChoppTheme } from "@/shared";
import { useDecrementShoppingCartItem } from "@/shared/hooks/use-decrement-shopping-cart-item";
import { useIncrementShoppingCartItem } from "@/shared/hooks/use-increment-shopping-cart-item";
import { ShoppingCart } from "@/store/slices/shopping-cart-slice";

type Props = {
  price: string;
  isInShoppingCart: boolean;
  shoppingCart: ShoppingCart;
  itemId: number;
};

export const ButtonsForProductGridItem = ({
  price,
  isInShoppingCart,
  shoppingCart,
  itemId,
}: Props) => {
  const decrement = useDecrementShoppingCartItem();
  const increment = useIncrementShoppingCartItem();
  const { t } = useTranslation();
  const { theme } = useChoppTheme();
  return (
    <>
      {!isInShoppingCart ? (
        <Badge size={20} style={styles.badge}>
          {
            shoppingCart.items.find((item) => item.product.id === itemId)
              ?.quantity
          }
        </Badge>
      ) : null}

      <IconButton
        icon="minus"
        disabled={isInShoppingCart}
        iconColor={theme.colors.primary}
        size={22}
        onPress={() => decrement({ itemId })}
      />
      <ChoppThemedText>
        {price}
        {t("currency")}
      </ChoppThemedText>
      <IconButton
        icon="plus"
        iconColor={theme.colors.primary}
        size={22}
        onPress={() => increment({ itemId })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 4,
    right: 12,
    zIndex: 90,
    backgroundColor: COLORS.dark.primary,
  },
});
