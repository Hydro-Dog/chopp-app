import React, { useState, useRef, useEffect } from "react";
import { Animated, View } from "react-native";
import { Card, IconButton } from "react-native-paper";

export const ChoppCollapsibleCard = ({ children, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animationHeight = useRef(new Animated.Value(0)).current;  // Контролирует высоту и прозрачность

  const handleLayout = event => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && contentHeight !== height) {
      setContentHeight(height);
    }
  };

  useEffect(() => {
    Animated.timing(animationHeight, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [isExpanded, contentHeight]);

  const animatedStyle = {
    overflow: 'hidden',
    height: animationHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight]  // Анимация до измеренной высоты контента
    }),
    opacity: animationHeight
  };

  return (
    <Card style={{ width: "100%", marginTop: 24 }}>
      <Card.Title
        right={(props) => (
          <IconButton
            {...props}
            icon={isExpanded ? "chevron-down" : "chevron-up"}
            onPress={() => setIsExpanded(!isExpanded)}
          />
        )}
        {...props}
      />
      <Animated.View style={animatedStyle}>
        <View onLayout={handleLayout}>
          <Card.Content>
            {children}
          </Card.Content>
        </View>
      </Animated.View>
    </Card>
  );
};
