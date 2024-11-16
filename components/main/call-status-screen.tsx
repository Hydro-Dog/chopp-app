import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Animated } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { TFunction } from "i18next";
import { useChoppTheme } from "../../shared/context";

//TODO: переделать на хук и не пробрасывать t  З

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
  currentStatus?: string;
  timeStamp?: number;
};

export const CallStatusScreen = ({ currentStatus, timeStamp }: Props) => {
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
            width: "100%",
          }}
        >
          <Card.Title
            title={`${step.title} ${timeStamp && `(${new Date(timeStamp).toLocaleTimeString()})`}`}
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
                  {...props}
                  style={{ backgroundColor: "transparent" }}
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
    flexDirection: "column",
    alignItems: "center",
    marginTop: 64,
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
});
