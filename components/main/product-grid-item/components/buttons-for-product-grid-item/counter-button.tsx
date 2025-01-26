import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Badge, IconButton } from "react-native-paper";
import { ChoppThemedText, useChoppTheme } from "@/shared";
import { useDecrementShoppingCartItem } from "@/shared/hooks/use-decrement-shopping-cart-item";
import { useIncrementShoppingCartItem } from "@/shared/hooks/use-increment-shopping-cart-item";
import { ShoppingCart } from "@/store/slices/shopping-cart-slice";

type Props = {
  price: string;
  isShoppingCartItem: boolean;
  shoppingCart: ShoppingCart;
  itemId: number;
};

export const CounterButtons = ({ price, isShoppingCartItem, shoppingCart, itemId }: Props) => {
  const { t } = useTranslation();
  const { theme } = useChoppTheme();
  const decrement = useDecrementShoppingCartItem();
  const increment = useIncrementShoppingCartItem();

  return (
    <>
      <IconButton
        icon="minus"
        disabled={!isShoppingCartItem}
        iconColor={theme.colors.primary}
        size={22}
        onPress={() => decrement({ itemId })}
      />
      <ChoppThemedText>
        {price}
        {t("currency")}
        {isShoppingCartItem && (
          <Badge
            style={{ ...styles.badge, backgroundColor: theme.colors.primaryContainer, color: theme.colors.onPrimary }}
          >
            {shoppingCart.items.find((item) => item.product.id === itemId)?.quantity}
          </Badge>
        )}
      </ChoppThemedText>

      <IconButton icon="plus" iconColor={theme.colors.primary} size={22} onPress={() => increment({ itemId })} />
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -8,
    zIndex: 90,
  },
});
