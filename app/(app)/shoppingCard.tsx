import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Checkbox, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { BasketProductCard } from "@/components/basket";
import {
  ChoppBackButton,
  ChoppScreenLayout,
  ChoppThemedText,
  useChoppTheme,
} from "@/shared";
import {
  BasketPOST,
  fetchGetShoppingCart,
  fetchPostShoppingCart,
} from "@/store/slices/basket-slice";

import { AppDispatch, RootState } from "@/store/store";

export default function Basket() {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useChoppTheme();
  const { basket } = useSelector((state: RootState) => state.basketItems);
  const { t } = useTranslation();
  const [deleteItems, setDeleteItems] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchGetShoppingCart());
  }, []);

  const chooseAll = () => {
    if (deleteItems.length != basket.items.length) {
      const tempDelete: number[] = [];
      basket.items.map((item) => tempDelete.push(item.product.id));
      setDeleteItems(tempDelete);
    } else {
      setDeleteItems([]);
    }
  };
  const del = () => {
    if (deleteItems.length !== 0) {
      const deleteItemsSet = new Set(deleteItems);
      const newBasket: BasketPOST = {
        items: basket.items
          .filter((item) => !deleteItemsSet.has(item.product.id))
          .map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
      };
      dispatch(fetchPostShoppingCart({ basket: newBasket }));
    }
  };
  return (
    <>
      <ChoppBackButton style={styles.backButton} redirectToRoot={true} />
      <View style={styles.upperPanel}>
        <Text style={styles.header} variant="headlineLarge">
          {t("basket")}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ChoppThemedText>{t("chooseAll")}</ChoppThemedText>
          <Checkbox
            status={
              deleteItems.length == basket.items.length
                ? "checked"
                : "unchecked"
            }
            onPress={() => chooseAll()}
          />
          <IconButton
            icon="delete"
            iconColor={theme.colors.primary}
            size={35}
            onPress={() => del()}
          />
        </View>
      </View>
      <ChoppScreenLayout>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <FlatList
              data={basket.items}
              keyExtractor={(item) => item.product.id.toString()}
              numColumns={1}
              renderItem={({ item }) => (
                <BasketProductCard
                  setDeleteItems={setDeleteItems}
                  deleteItems={deleteItems}
                  item={item}
                />
              )}
            />
          </View>
          {basket.quantity ? (
            <View style={{ flexDirection: "column" }}>
              <View style={styles.priceAndButton}>
                <ChoppThemedText style={{ fontSize: 20 }}>
                  {basket.totalPrice}
                  {t("currency")}
                </ChoppThemedText>
                <Button
                  style={styles.buyButton}
                  mode="contained"
                  onPress={() => console.log("Pressed")}
                >
                  {t("toOrder")}
                </Button>
              </View>
              {/* TODO Нужно будет добавить в переводчик, когда будем с Артемом соеденять */}
              <ChoppThemedText style={{ fontSize: 12, textAlign: "center" }}>
                Закажите еще на n рублей, для бесплатной доставки
              </ChoppThemedText>
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
  upperPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceAndButton: {
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
