import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { CONFIG } from "@/my-config";
import { ChoppThemedText, OrderItem } from "@/shared";

type Props = {
  item: OrderItem;
};

export const OrderHistoryProductCard = ({ item }: Props) => {
  const { t } = useTranslation();
  return (
    <Card style={styles.card}>
      <Card.Cover style={styles.img} source={{ uri: `${(CONFIG.filesUrl || "") + item.product.images[0].path}` }} />
      <Card.Content>
        <ChoppThemedText numberOfLines={1}>{item.product.title}</ChoppThemedText>
        <ChoppThemedText numberOfLines={1}>
          {item.quantity} {t("count")}
        </ChoppThemedText>
        <ChoppThemedText numberOfLines={1}>
          {item.price} {t("currency")}/{t("count")}
        </ChoppThemedText>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    margin: 5,
    width: 150,
  },
  img: {
    borderRadius: 10,
  },
});
