import React, { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
  ActivityIndicator,
} from "react-native";
import { useChoppTheme } from "../context";

type Props = {
  onPress: () => void;
  title?: string;
  loading?: boolean;
};

let isHeld: number | null = null;

export const ChoppBigRoundButton = ({ onPress, title, loading }: Props) => {
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
        onPressIn={!loading ? pressInHandler : () => null}
        onPressOut={!loading ? pressOutHandler : () => null}
        activeOpacity={1}
        style={{
          backgroundColor: loading
            ? theme.colors.inversePrimary
            : theme.colors.primary,
          ...styles.touchableArea,
        }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: loading
                ? theme.colors.inverseOnSurface
                : theme.colors.background,
              ...styles.button,
            },
            { transform: [{ scale: buttonScale }] },
          ]}
        >
          {loading && (
            <ActivityIndicator
              size="large"
              animating={true}
              color={theme.colors.inversePrimary}
              style={styles.activityIndicator}
            />
          )}
          <Animated.View style={fillStyle} />
          {!loading && (
            <Text style={{ color: theme.colors.primary, ...styles.buttonText }}>
              {title || t("button")}
            </Text>
          )}
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
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  button: {
    width: 130,
    height: 130,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  buttonText: {
    fontSize: 24,
  },
  activityIndicator: {
    position: "absolute",
    zIndex: 1,
  },
});
