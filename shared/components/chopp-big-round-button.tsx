import React, { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { useChoppTheme } from "../context";

type Props = {
  onPress: () => void;
  title?: string;
};

let isHeld: number | null = null;

export const ChoppBigRoundButton = ({ onPress, title }: Props) => {
  const { t } = useTranslation();
  const { theme } = useChoppTheme();
  const [buttonScale] = useState(new Animated.Value(1));
  const fillAnimation = useRef(new Animated.Value(0)).current;

  const pressInHandler = useCallback(() => {
    isHeld = Date.now();
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: false,
    }).start();

    fillAnimation.setValue(0);
    Animated.timing(fillAnimation, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        isHeld = null;
      });

      if (Date.now() - isHeld > 900) {
        onPress();
      }
    });
  }, [buttonScale, fillAnimation, onPress]);

  const pressOutHandler = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    fillAnimation.stopAnimation();
    fillAnimation.setValue(0);
  };

  const fillStyle = {
    height: fillAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
    width: "100%",
    backgroundColor: theme.colors.primaryContainer,
    position: "absolute",
    bottom: 0,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
        activeOpacity={1}
        style={{
          backgroundColor: theme.colors.primary,
          ...styles.touchableArea,
        }}
      >
        <Animated.View
          style={[
            { backgroundColor: theme.colors.background, ...styles.button },
            { transform: [{ scale: buttonScale }] },
          ]}
        >
          <Animated.View style={fillStyle} />
          <Text style={{ color: theme.colors.primary, ...styles.buttonText }}>
            {t("button") || title}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableArea: {
    width: 200,
    height: 200,
    borderRadius: 100,
    // backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  button: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
    overflow: "hidden",
    position: "relative",
  },
  buttonText: {
    // color: "#6200ee",
    fontSize: 24,
  },
});
