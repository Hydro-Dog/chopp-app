import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { CONFIG } from "@/my-config";
import { ChoppThemedText, OrderItem } from "@/shared";

type Props = {
  item: OrderItem;
};

export const OrderCardItem = ({ item }: Props) => {
  const { t } = useTranslation();

  return (
    <Card style={styles.container}>
      <View style={styles.goods}>
        <Card.Cover style={styles.img} source={{ uri: `${(CONFIG.filesUrl || "") + item.product.images[0].path}` }} />
        <Card.Content>
          <ChoppThemedText>{item.product.title}</ChoppThemedText>
          <ChoppThemedText>
            {item.quantity} {t("count")}
          </ChoppThemedText>
          <ChoppThemedText>
            {item.product.price} {t("currency")}/{t("count")}
          </ChoppThemedText>
        </Card.Content>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  goods: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    borderRadius: 10,
    width: 150,
    height: 150,
  },
});
