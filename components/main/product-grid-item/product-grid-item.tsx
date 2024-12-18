import * as React from "react";
import { Dimensions } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { StyleSheet } from 'react-native';

interface Props {
  imagePath: string;
  title: string;
  description: string;
  price: string;
}

export const ProductGridItem = ({
  imagePath,
  title,
  description,
  price,
}: Props) => {
  const { width } = Dimensions.get("window");

  console.log("imagePath: ", imagePath);

  return (
    <Card style={{ width: (width - 40) / 2, margin: "0.5rem" }}>
      <Card.Cover style={{ margin: 10 }} source={{ uri: imagePath }} />
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium">{description}</Text>
        <Text>{price}₽</Text>
      </Card.Content>
      <Card.Actions>
        <Button labelStyle={styles.inButton}>
          +
        </Button>
      </Card.Actions>
    </Card>
  );
};
const styles = StyleSheet.create({
  inButton: {
    margin: 0,
  },
});
