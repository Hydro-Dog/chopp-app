import * as React from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Badge, Card, IconButton, Text } from "react-native-paper";
import { ChoppThemedText, useChoppTheme } from "@/shared";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { COLORS } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { delBasketItems, setBasketItems } from "@/store/slices/basket-slice";

const { width } = Dimensions.get("window");

interface Props {
  imagePath: string;
  title: string;
  price: string;
  id: number;
}
export const ProductGridItem = ({ imagePath, title, price, id }: Props) => {
  const { theme } = useChoppTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [inBasket, setInBasket] = useState(false);
  const { basket } = useSelector((state: RootState) => state.basketItems);
  useEffect(()=>{
    if (basket?.items.find((item) => item.productId === id)) {
      setInBasket(false);
    }
    else{
      setInBasket(true)
    }
  }, [basket])

  return (
    <Card style={styles.card} onPress={() => router.push("/product-card")}>
      <Card.Cover source={{ uri: imagePath }} />
      <Card.Content style={styles.content}>
        <ChoppThemedText style={styles.title} numberOfLines={1}>
          {title}
        </ChoppThemedText>
      </Card.Content>
      <Card.Content style={styles.bottomPart}>
        {!inBasket ? (
          <Badge size={20} style={styles.badge}>
            {basket?.items.find((item) => item.productId === id)?.quantity}
          </Badge>
        ) : null}

        <IconButton
          icon="minus"
          disabled={inBasket}
          iconColor={theme.colors.primary}
          size={22}
          onPress={() => dispatch(delBasketItems(id))}
        />
        <Text variant="titleMedium">{`${price}₽`}</Text>
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
  badge: {
    position: "absolute",
    top: 4,
    right: 12,
    zIndex: 90,
    backgroundColor: COLORS.dark.primary,
  },
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
