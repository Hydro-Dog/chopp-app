import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { BasketProductCard } from "@/components/basket";
import {
  ChoppBackButton,
  ChoppScreenLayout,
  ChoppThemedText,
  useChoppTheme,
} from "@/shared";
import {
  fetchDelShoppingCart,
  fetchGetShoppingCart,
} from "@/store/slices/basket-slice";

import { AppDispatch, RootState } from "@/store/store";

export default function Basket() {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useChoppTheme();
  const { basket } = useSelector((state: RootState) => state.basketItems);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchGetShoppingCart());
  }, []);

  return (
    <>
      <ChoppBackButton style={styles.backButton} redirectToRoot={true} />
      <View style={styles.upperPanel}>
        <Text style={styles.header} variant="headlineLarge">
          {t("basket")}
        </Text>
        <IconButton
          icon="delete"
          iconColor={theme.colors.primary}
          size={35}
          onPress={() => dispatch(fetchDelShoppingCart())}
        />
      </View>
      <ChoppScreenLayout>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <FlatList
              data={basket.items}
              keyExtractor={(item) => item.product.id.toString()}
              numColumns={1}
              renderItem={({ item }) => <BasketProductCard {...item} />}
            />
          </View>
          {basket.quantity ? (
            <View style={styles.bottomPanel}>
              <ChoppThemedText style={{ fontSize: 20 }}>
                {basket.totalPrice}{t("currency")}
              </ChoppThemedText>
              <Button
                style={styles.buyButton}
                mode="contained"
                onPress={() => console.log("Pressed")}
              >
                {t("toOrder")}
              </Button>
            </View>
          ) : (
            <Text style={styles.emptyBasket}>{t("emptyBasket")}</Text>
          )}
        </View>
      </ChoppScreenLayout>
    </>
  );
}
const styles = StyleSheet.create({
  upperPanel:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 15,
    paddingBlock: 10,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyBasket: {
    textAlign: "center",
    padding: 15,
  },
  buyButton: {
    marginHorizontal: 15,
  },
  clearButton: {
    marginHorizontal: 15,
  },
  backButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },
  header: {
    padding: 15,
  },
});
