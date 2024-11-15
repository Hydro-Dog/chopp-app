import React, { useEffect, useState } from "react";
import { FlatList, Animated, FlatListProps, ViewStyle } from "react-native";
import { ChoppThemedText } from "./chopp-themed-text";

// Определение новых типов пропсов
interface ChoppAnimatedListProps<ItemT>
  extends Omit<FlatListProps<ItemT>, "renderItem" | "data"> {
  data: ItemT[];
  renderItem: (item: ItemT) => JSX.Element;
}

export const ChoppAnimatedList = <ItemT,>({
  data,
  renderItem,
  ...restProps
}: ChoppAnimatedListProps<ItemT>) => {
  // Пример анимации
  const fadeAnim = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <FlatList<ItemT>
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Animated.View
          style={{
            paddingHorizontal: 8,
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
          }}
        >
          {renderItem(item)}
        </Animated.View>
      )}
      {...restProps}
    />
  );
};
