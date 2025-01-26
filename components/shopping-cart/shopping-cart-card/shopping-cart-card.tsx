import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { CONFIG } from "@/my-config";
import { ChoppThemedText, useChoppTheme } from "@/shared";
import ChoppCheckbox from "@/shared/components/chopp-checkbox";
import { useDecrementShoppingCartItem } from "@/shared/hooks/use-decrement-shopping-cart-item";
import { useIncrementShoppingCartItem } from "@/shared/hooks/use-increment-shopping-cart-item";
import { ShoppingCartItem } from "@/store/slices/shopping-cart-slice";
const { width } = Dimensions.get("window");

type Props = {
  item: ShoppingCartItem;
  itemIdsForDelete: number[];
  setItemIdsForDelete: Dispatch<SetStateAction<number[]>>;
  isDeleteMode: boolean;
};

export const ShoppingCartCard = ({ item, itemIdsForDelete, setItemIdsForDelete, isDeleteMode }: Props) => {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const decrement = useDecrementShoppingCartItem();
  const increment = useIncrementShoppingCartItem();

  const selectItem = (checked: boolean) => {
    setItemIdsForDelete((prev) => (checked ? [...prev, item.product.id] : prev.filter((id) => id !== item.product.id)));
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
          <ChoppThemedText numberOfLines={1}>{item.product.description}</ChoppThemedText>
          <ChoppThemedText>
            {item.product.price} {t("currency")}/{t("count")}
          </ChoppThemedText>
        </View>
        <View style={styles.rightBlock}>
          <View style={styles.checkbox}>
            {isDeleteMode && <ChoppCheckbox value={itemIdsForDelete.includes(item.product.id)} onChange={selectItem} />}
          </View>
          <View style={styles.buttons}>
            <IconButton
              icon="minus"
              iconColor={theme.colors.primary}
              size={22}
              onPress={() => decrement({ itemId: item.product.id })}
            />
            <ChoppThemedText style={{ color: theme.colors.primary, fontSize: 18 }}>{item.quantity}</ChoppThemedText>
            <IconButton
              icon="plus"
              iconColor={theme.colors.primary}
              size={22}
              onPress={() => increment({ itemId: item.product.id })}
            />
          </View>
          <ChoppThemedText style={styles.totalPrice}>
            {item.totalPrice} {t("currency")}
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
  },
  img: {
    borderRadius: 10,
    flex: 1,
    height: 150,
  },
});
