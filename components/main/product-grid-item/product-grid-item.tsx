import * as React from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useChoppTheme } from "@/shared";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

interface Props {
  imagePath: string;
  title: string;
  price: string;
}
export const ProductGridItem = ({ imagePath, title, price }: Props) => {
  const { theme } = useChoppTheme();

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
          disabled
          iconColor={theme.colors.primary}
          size={22}
          onPress={() => console.log("Pressed")}
        />
        <Text variant="titleMedium">{price}₽</Text>
        <IconButton
          icon="plus"
          iconColor={theme.colors.primary}
          size={22}
          onPress={() => console.log("Pressed")}
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
