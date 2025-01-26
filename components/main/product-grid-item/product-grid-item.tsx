import * as React from "react";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import { ButtonsForProductGridItem } from "../buttons-for-product-grid-item";
import { ChoppThemedText } from "@/shared";
import { RootState } from "@/store/store";

const { width } = Dimensions.get("window");

interface Props {
  imagePath: string;
  title: string;
  price: string;
  itemId: number;
}
export const ProductGridItem = ({ imagePath, title, price, itemId }: Props) => {
  const [isInShoppingCart, setInShoppingCart] = useState(false);
  const { shoppingCart } = useSelector(
    (state: RootState) => state.shoppingCart,
  );
  useEffect(() => {
    if (shoppingCart?.items.find((item) => item.product.id === itemId)) {
      setInShoppingCart(false);
    } else {
      setInShoppingCart(true);
    }
  }, [shoppingCart]);

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imagePath }} />
      <Card.Content style={styles.content}>
        <ChoppThemedText style={styles.title} numberOfLines={1}>
          {title}
        </ChoppThemedText>
      </Card.Content>
      <Card.Content style={styles.bottomPart}>
        <ButtonsForProductGridItem
          itemId={itemId}
          shoppingCart={shoppingCart}
          isInShoppingCart={isInShoppingCart}
          price={price}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  countInBasket: {
    textAlign: "center",
  },
  bottomPart: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 8,
    fontWeight: 400,
  },
  content: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  card: {
    width: (width - 50) / 2,
    margin: 4,
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: "transparent",
  },
});
