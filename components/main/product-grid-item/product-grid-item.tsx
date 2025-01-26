import * as React from "react";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import { CounterButtons } from "./components";
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
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const [isShoppingCartItem, setIsShoppingCartItem] = useState(false);

  useEffect(() => {
    if (shoppingCart?.items.find((item) => item.product.id === itemId)) {
      setIsShoppingCartItem(true);
    } else {
      setIsShoppingCartItem(false);
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
      <Card.Content style={styles.footer}>
        <CounterButtons
          itemId={itemId}
          shoppingCart={shoppingCart}
          isShoppingCartItem={isShoppingCartItem}
          price={price}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  footer: {
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
