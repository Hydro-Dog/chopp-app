import * as React from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useChoppTheme } from "@/shared";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { delBasketItems, setBasketItems } from "@/store/slices/basket-slice";
import { RootState } from "@/store/store";

const { width } = Dimensions.get("window");

interface Props {
  imagePath: string;
  title: string;
  price: string;
  id: number;
}
export const ProductGridItem = ({ imagePath, title, price, id }: Props) => {
  const { theme } = useChoppTheme();
  const dispatch = useDispatch();
  const { basketItems } = useSelector((state: RootState) => state.basketItems);

  return (
    <Card style={styles.card} onPress={() => router.push("/product-card")}>
      <Card.Cover source={{ uri: imagePath }} />
      <Card.Content style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </Card.Content>
      <Card.Content style={styles.bottomPart}>
        <IconButton
          icon="minus"
          disabled={
            (basketItems.find((item) => item.key === id)?.value ?? 0) < 1
          }
          iconColor={theme.colors.primary}
          size={22}
          onPress={() => dispatch(delBasketItems(id))}
        />
        <Text variant="titleMedium">
          {(basketItems.find((item) => item.key === id)?.value ?? 0) ||
            `${price}₽`}
        </Text>
        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          size={22}
          onPress={() => dispatch(setBasketItems(id))}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
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
