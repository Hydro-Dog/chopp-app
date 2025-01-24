import { CONFIG } from "@/my-config";
import { ChoppThemedText, useChoppTheme } from "@/shared";
import {BasketItem} from "@/store/slices/basket-slice";
import { AppDispatch, RootState } from "@/store/store";
import { Decrement, Increment } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, Checkbox, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
const { width } = Dimensions.get("window");

type Props = {
  item: BasketItem;
  deleteItems: number[];
  setDeleteItems: Dispatch<SetStateAction<number[]>>;
};

export const BasketProductCard = ({
  deleteItems,
  setDeleteItems,
  item,
}: Props) => {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const { basket } = useSelector((state: RootState) => state.basketItems);
  const dispatch = useDispatch<AppDispatch>();

  const setDeleteThis = () => {
    const findItem = deleteItems.find((id) => id === item.product.id);
    if (findItem) {
      setDeleteItems((prev) => {
        const newDeleteItems = prev.filter((id) => id !== item.product.id);
        return newDeleteItems;
      });
    } else {
      setDeleteItems((prev) => [...prev, item.product.id]);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Card.Cover
          style={styles.img}
          source={{
            uri: `${CONFIG.filesUrl + item.product.images[0].path}`,
          }}
        />
        <View style={styles.text}>
          <ChoppThemedText style={styles.title} numberOfLines={1}>
            {item.product.title}
          </ChoppThemedText>
          <ChoppThemedText numberOfLines={1}>
            {item.product.description}
          </ChoppThemedText>
          <ChoppThemedText>
            {item.product.price} {t("currency")}/{t("count")}
          </ChoppThemedText>
        </View>
        <View style={styles.rightBlock}>
          <View style={styles.checkbox}>
            <Checkbox
              status={
                deleteItems.find((id) => id === item.product.id) != undefined
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => setDeleteThis()}
            />
          </View>
          <View style={styles.buttons}>
            <IconButton
              icon="minus"
              iconColor={theme.colors.primary}
              size={22}
              onPress={() => Decrement(item.product.id, basket, dispatch)}
            />
            <Text style={{ color: theme.colors.primary }} variant="titleMedium">
              {item.quantity}
            </Text>
            <IconButton
              icon="plus"
              iconColor={theme.colors.primary}
              size={22}
              onPress={() => Increment(item.product.id, basket, dispatch)}
            />
          </View>
          <ChoppThemedText style={styles.totalPrice}>
            {item.totalPrice}
            {t("currency")}
          </ChoppThemedText>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  totalPrice: {
    flex: 2,
  },
  checkbox: {
    alignSelf: "flex-end",
  },
  title: {
    fontWeight: 400,
    fontSize: 20,
  },
  card: {
    paddingInline: 10,
    margin: 5,
    width: width - 10,
    backgroundColor: "transparent",
    height: 150,
  },
  rightBlock: {
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingInline: 10,
    flex: 2,
    //	alignItems: "center",
  },
  img: {
    borderRadius: 10,
    flex: 1,
    height: 150,
  },
});
