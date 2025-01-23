import { CONFIG } from "@/my-config";
import { ChoppThemedText, useChoppTheme } from "@/shared";
import { BasketItem, fetchPostShoppingCart } from "@/store/slices/basket-slice";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
const { width } = Dimensions.get("window");

export const BasketProductCard = (item: BasketItem) => {
  const { theme } = useChoppTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { basket } = useSelector((state: RootState) => state.basketItems);
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
          <View style={styles.buttons}>
            <IconButton
              icon="minus"
              iconColor={theme.colors.onPrimary}
              containerColor={theme.colors.primary}
              mode="outlined"
              size={18}
              onPress={() =>
                dispatch(
                  fetchPostShoppingCart({
                    basket,
                    item: item.product.id,
                    append: false,
                  }),
                )
              }
            />
            <Text style={{ color: theme.colors.primary }} variant="titleMedium">
              {item.quantity}
            </Text>
            <IconButton
              icon="plus"
              iconColor={theme.colors.onPrimary}
              containerColor={theme.colors.primary}
              mode="outlined"
              size={18}
              onPress={() =>
                dispatch(
                  fetchPostShoppingCart({
                    basket,
                    item: item.product.id,
                    append: true,
                  }),
                )
              }
            />
          </View>
          <ChoppThemedText>
            {item.totalPrice}
            {t("currency")}
          </ChoppThemedText>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
