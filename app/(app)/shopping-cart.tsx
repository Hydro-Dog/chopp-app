import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Checkbox, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartCard } from "@/components/shopping-cart";
import {
  ChoppBackButton,
  ChoppScreenLayout,
  ChoppThemedText,
  useChoppTheme,
} from "@/shared";
import {
  postShoppingCartDTO,
  fetchShoppingCart,
  postShoppingCart,
} from "@/store/slices/shopping-cart-slice";

import { AppDispatch, RootState } from "@/store/store";

export default function ShoppingCart() {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useChoppTheme();
  const { shoppingCart } = useSelector(
    (state: RootState) => state.shoppingCart,
  );
  const { t } = useTranslation();
  const [itemIdsForDelete, setItemIdsForDelete] = useState<number[]>([]);
  const [isChoose, setChoose] = useState(false);

  useEffect(() => {
    dispatch(fetchShoppingCart());
  }, []);

  const chooseAll = () => {
    if (itemIdsForDelete.length !== shoppingCart.items.length) {
      const tempDelete: number[] = [];
      shoppingCart.items.map((item) => tempDelete.push(item.product.id));
      setItemIdsForDelete(tempDelete);
    } else {
      setItemIdsForDelete([]);
    }
  };
  const deleteChosenItem = () => {
    if (itemIdsForDelete.length !== 0) {
      const deleteItemsSet = new Set(itemIdsForDelete);
      const newShoppingCart: postShoppingCartDTO = {
        items: shoppingCart.items
          .filter((item) => !deleteItemsSet.has(item.product.id))
          .map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
      };
      dispatch(postShoppingCart({ newShoppingCart }));
      setItemIdsForDelete([]);
    }
  };
  return (
    <>
      <ChoppBackButton style={styles.backButton} redirectToRoot={true} />
      <View style={styles.upperPanel}>
        <View style={styles.titleAndButton}>
          <ChoppThemedText style={styles.header}>
            {t("shoppingCart")}
          </ChoppThemedText>
          <Button mode="contained" onPress={() => setChoose((prev) => !prev)}>
            {isChoose ? t("cancel") : t("choose")}
          </Button>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isChoose && (
            <View style={styles.ifChoose}>
              <ChoppThemedText>{t("chooseAll")}</ChoppThemedText>
              <Checkbox
                status={
                  itemIdsForDelete.length == shoppingCart.items.length
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => chooseAll()}
              />
              <IconButton
                icon="delete"
                iconColor={theme.colors.primary}
                size={35}
                onPress={() => deleteChosenItem()}
              />
            </View>
          )}
        </View>
      </View>
      <ChoppScreenLayout>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <FlatList
              data={shoppingCart.items}
              keyExtractor={(item) => item.product.id.toString()}
              numColumns={1}
              renderItem={({ item }) => (
                <ShoppingCartCard
                  setItemIdsForDelete={setItemIdsForDelete}
                  itemIdsForDelete={itemIdsForDelete}
                  item={item}
                  isChoose={isChoose}
                />
              )}
            />
          </View>
          {shoppingCart.quantity ? (
            <View style={{ flexDirection: "column" }}>
              <View style={styles.priceAndButton}>
                <ChoppThemedText style={{ fontSize: 20 }}>
                  {shoppingCart.totalPrice}
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
            <ChoppThemedText style={styles.emptyBasket}>
              {t("emptyBasket")}
            </ChoppThemedText>
          )}
        </View>
      </ChoppScreenLayout>
    </>
  );
}
const styles = StyleSheet.create({
  ifChoose: {
    paddingInline: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  titleAndButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 15,
  },
  upperPanel: {
    flexDirection: "column",
    justifyContent: "space-between",
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
    fontSize: 32,
  },
});
