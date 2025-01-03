import React, { useRef, useEffect } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import { useChoppTheme } from "../context/chopp-theme-context";
import { ChoppThemedText } from "./chopp-themed-text";

type Props = {
  value: boolean;
  label?: React.ReactNode;
  onChange?: (value: boolean) => void;
};

export const ChoppCheckbox = ({ value, onChange, label }: Props) => {
  const { theme } = useChoppTheme();
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.primary, theme.colors.onSecondary],
  });

  const opacityInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };

  const animatedOpacity = {
    opacity: opacityInterpolation,
  };

  const animatedScaleStyle = {
    transform: [{ scale }],
  };

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();

    if (onChange) {
      onChange(!value);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.checkbox,
            animatedStyle,
            animatedScaleStyle,
            {
              borderColor: value ? theme.colors.primary : theme.colors.outline,
              backgroundColor: theme.colors.onSecondary,
            },
          ]}
        >
          {value && (
            <Animated.View
              style={[
                {
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
                animatedOpacity,
              ]}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24">
                <Path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  fill={theme.colors.primary}
                />
              </Svg>
            </Animated.View>
          )}
        </Animated.View>
        {label && <ChoppThemedText>{label}</ChoppThemedText>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
  },
});
