import * as React from "react";
import { Dimensions } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/сolors";

interface Props {
  imagePath: string;
  title: string;
  price: string;
}

export const ProductGridItem = ({ imagePath, title, price }: Props) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imagePath }} />
      <Card.Content>
        <Text style={styles.title} numberOfLines={2} variant="titleMedium">
          <b>{title}</b>
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button style={styles.button}>
          <Text variant="titleMedium">{price}₽+</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 0,
    backgroundColor: COLORS.light.primaryContainer,
  },
  title: {
    height: 50,
  },
  content: {
    width: "100%",
  },
  card: {
    width: (width - 50) / 2,
    margin: 5,
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  activityIndicator: {
    position: "absolute",
    top: 40,
    right: 40,
  },
});
