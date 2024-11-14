import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image, Animated } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { TFunction } from "i18next";
import { useChoppTheme } from "../../shared/context";

import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";

const getStepsMap = (t: TFunction<"translation", undefined>) => ({
  processing: {
    title: t("callStatus.processing"),
    description: t("callStatus.processingHint"),
    icon: "progress-clock",
  },
  accepted: {
    title: t("callStatus.accepted"),
    description: t("callStatus.acceptedHint"),
    icon: "check-circle-outline",
  },
  onTheWay: {
    title: t("callStatus.onTheWay"),
    description: t("callStatus.onTheWayHint"),
    icon: "car",
  },
  onTheSpot: {
    title: t("callStatus.onTheSpot"),
    description: t("callStatus.onTheSpotHint"),
    icon: "map-marker",
  },
  completed: {
    title: t("callStatus.completed"),
    description: t("callStatus.completedHint"),
    icon: "check-all",
  },
});

const steps = ["processing", "accepted", "onTheWay", "onTheSpot", "completed"];

type Props = {
  currentStatus: string;
  timeStamp: number;
};

export const ChoppCallStatusScreen = ({ currentStatus, timeStamp }: Props) => {
  const { t } = useTranslation();
  const { theme } = useChoppTheme();

  const completedIndex = steps.findIndex((item) => item === currentStatus);
  const completedSteps = steps.slice(0, completedIndex + 1);
  const stepsMap = getStepsMap(t);

  // Создаем анимированные значения для каждого шага
  const backgroundColors = steps.map(
    (step) =>
      useRef(new Animated.Value(completedSteps.includes(step) ? 1 : 0)).current
  );

  // Анимируем изменение фона
  useEffect(() => {
    steps.forEach((step, index) => {
      Animated.timing(backgroundColors[index], {
        toValue: completedSteps.includes(step) ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }, [backgroundColors, completedSteps]);

  return (
    <>
      {Object.entries(stepsMap).map(([stepName, step], index) => (
        <View
          key={index}
          style={{
            flexDirection: "column",
            width: "100%",
            marginLeft: 40,
            marginRight: 40,
          }}
        >
          <Card.Title
            title={`${step.title} (${new Date(timeStamp).toLocaleTimeString()})`}
            subtitle={step.description}
            left={(props) => (
              <Animated.View
                style={{
                  ...styles.iconLineContainer,
                  backgroundColor: backgroundColors[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      theme.colors.surfaceDisabled,
                      theme.colors.primary,
                    ],
                  }),
                }}
              >
                <Avatar.Icon
                  style={{ backgroundColor: "transparent" }}
                  {...props}
                  icon={step.icon}
                />
              </Animated.View>
            )}
          />
          {index < Object.entries(stepsMap).length - 1 && (
            <Animated.View
              style={{
                ...styles.verticalLine,
                backgroundColor: backgroundColors[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    theme.colors.surfaceDisabled,
                    theme.colors.primary,
                  ],
                }),
              }}
            />
          )}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // height: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 64,
  },
  card: {
    marginBottom: 16,
    overflow: "hidden",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconLineContainer: {
    borderRadius: 100,
    alignItems: "center",
  },
  verticalLine: {
    marginLeft: 34,
    width: 2,
    height: 8,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  activeTitle: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  inactiveTitle: {
    color: "#999",
  },
  description: {
    color: "#666",
  },

  logo: {
    width: 128,
    height: 128,
  },
});
