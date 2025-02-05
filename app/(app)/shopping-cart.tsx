import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";
import { View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartCard, ShoppingCartPriceSection, ShoppingCartTopBar } from "@/components/shopping-cart";
import { OrderAdditionalInfoModal } from "@/components/shopping-cart";
import { ChoppBackButton, ChoppScreenLayout, ChoppThemedText } from "@/shared";
import { PostShoppingCartDTO, fetchShoppingCart, postShoppingCart } from "@/store/slices/shopping-cart-slice";
import { AppDispatch, RootState } from "@/store/store";

export default function ShoppingCart() {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const [itemIdsToDelete, setItemIdsToDelete] = useState<number[]>([]);
  const [isDeleteMode, setChoose] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchShoppingCart());
  }, []);

  const chooseAllItems = () => {
    if (itemIdsToDelete.length !== shoppingCart.items.length) {
      const itemsToDelete = shoppingCart.items.map((item) => item.product.id);
      setItemIdsToDelete(itemsToDelete);
    } else {
      setItemIdsToDelete([]);
    }
  };

  const deleteChosenItem = () => {
    if (!!itemIdsToDelete.length) {
      const deleteItemsSet = new Set(itemIdsToDelete);

      const newShoppingCart: PostShoppingCartDTO = {
        items: shoppingCart.items
          .filter((item) => !deleteItemsSet.has(item.product.id))
          .map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
      };

      dispatch(postShoppingCart({ newShoppingCart }));
      setItemIdsToDelete([]);
    }
  };

  const toggleDeleteMode = () => {
    setItemIdsToDelete([]);
    setChoose((prev) => !prev);
  };

  return (
    <>
      <ChoppBackButton style={styles.backButton} redirectToRoot={true} />
      <ShoppingCartTopBar
        isDeleteMode={isDeleteMode}
        toggleDeleteMode={toggleDeleteMode}
        itemIdsToDelete={itemIdsToDelete}
        shoppingCart={shoppingCart}
        chooseAllItems={chooseAllItems}
        deleteChosenItem={deleteChosenItem}
      />

      {/* TODO: вынести модалку в отдельный компонент  */}
      <Portal>
        <Modal visible={isModalVisible}>
          <OrderAdditionalInfoModal onClose={() => setModalVisible(false)} totalPrice={shoppingCart.totalPrice} />
        </Modal>
      </Portal>

      <ChoppScreenLayout>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <FlatList
              data={shoppingCart.items}
              keyExtractor={(item) => item.product.id.toString()}
              numColumns={1}
              renderItem={({ item }) => (
                <ShoppingCartCard
                  setItemIdsForDelete={setItemIdsToDelete}
                  itemIdsForDelete={itemIdsToDelete}
                  item={item}
                  isDeleteMode={isDeleteMode}
                />
              )}
            />
          </View>
          {shoppingCart.quantity ? (
            <ShoppingCartPriceSection onOrderPressed={() => setModalVisible(true)} shoppingCart={shoppingCart} />
          ) : (
            <ChoppThemedText style={styles.emptyBasket}>{t("emptyBasket")}</ChoppThemedText>
          )}
        </View>
      </ChoppScreenLayout>
    </>
  );
}

const styles = StyleSheet.create({
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
  backButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },
});
