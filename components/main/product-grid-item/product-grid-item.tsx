import * as React from "react";
import { Animated, Dimensions, Pressable } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useChoppTheme } from "@/shared";
import { useEffect, useState } from "react";

interface Props {
  imagePath: string;
  title: string;
  price: string;
}
export const ProductGridItem = ({ imagePath, title, price }: Props) => {
  const { theme } = useChoppTheme();
  const [pressed, setPressed] = useState(false);
  const backgroundColor = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: pressed ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [pressed]);

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.primaryContainer, theme.colors.primary],
  });
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imagePath }} />
      <Card.Content>
        <Text style={styles.title} numberOfLines={2} variant="titleMedium">
          {title}
        </Text>
      </Card.Content>
      <Card.Content style={styles.bottomPart}>
        <Text variant="titleMedium">
          <b>{price}₽</b>
        </Text>
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: interpolatedColor,
            },
          ]}
        >
          <Pressable
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
          >
            <Text variant="titleLarge">+</Text>
          </Pressable>
        </Animated.View>
      </Card.Content>
    </Card>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  bottomPart: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
    borderWidth: 0,
    borderRadius: 100,
  },
  title: {
    height: 50,
    marginTop: 20,
  },
  content: {
    width: "100%",
  },
  card: {
    width: (width - 50) / 2,
    margin: 5,
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: "transparent",
  },
  activityIndicator: {
    position: "absolute",
    top: 40,
    right: 40,
  },
  contentStyle: {
    margin: 0,
    padding: 0,
  },
});
