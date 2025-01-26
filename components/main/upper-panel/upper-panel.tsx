import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Badge, IconButton, Searchbar } from "react-native-paper";
import { router } from "expo-router";
import { useChoppTheme } from "@/shared";
import { ShoppingCart } from "@/store/slices/shopping-cart-slice";

type Props = {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  shoppingCart: ShoppingCart;
};

export const UpperPanel = ({
  setSearchQuery,
  searchQuery,
  shoppingCart,
}: Props) => {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  return (
    <View style={styles.upContainer}>
      <Searchbar
        placeholder={t("search")}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      {shoppingCart.quantity ? (
        <Badge style={styles.badge}>{shoppingCart.quantity}</Badge>
      ) : null}

      <IconButton
        icon="basket"
        iconColor={theme.colors.primary}
        style={styles.shoppingCart}
        size={40}
        onPress={() => router.push("shopping-cart")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  upContainer: {
    flexDirection: "row",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 16,
    zIndex: 90,
  },
  shoppingCart: {
    flex: 1,
  },
  search: {
    marginLeft: 10,
    marginTop: 10,

    flex: 4,
  },
});
