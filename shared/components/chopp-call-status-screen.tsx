import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { useChoppTheme } from "../context";
import { useSelector } from "react-redux";
import { useFilterWsMessages } from "../hooks";

const stepsMap = {
  processing: {
    title: "Processing",
    description: "Your request is being processed.",
    icon: "progress-clock",
  },
  accepted: {
    title: "Accepted",
    description: "Your request has been accepted.",
    icon: "check-circle-outline",
  },
  onTheWay: {
    title: "On The Way",
    description: "The service is on its way to your location.",
    icon: "car",
  },
  onTheSpot: {
    title: "On The Spot",
    description: "The service has arrived at your location.",
    icon: "map-marker",
  },
  completed: {
    title: "Completed",
    description: "The service has been completed successfully.",
    icon: "check-all",
  },
};

// const steps = [
//   {
//     key: "processing",
//     title: "Processing",
//     description: "Your request is being processed.",
//     icon: "progress-clock",
//   },
//   {
//     key: "accepted",
//     title: "Accepted",
//     description: "Your request has been accepted.",
//     icon: "check-circle-outline",
//   },
//   {
//     key: "onTheWay",
//     title: "On The Way",
//     description: "The service is on its way to your location.",
//     icon: "car",
//   },
//   {
//     key: "onTheSpot",
//     title: "On The Spot",
//     description: "The service has arrived at your location.",
//     icon: "map-marker",
//   },
//   {
//     key: "completed",
//     title: "Completed",
//     description: "The service has been completed successfully.",
//     icon: "check-all",
//   },
// ];

const steps = ["processing", "accepted", "onTheWay", "onTheSpot", "completed"];

export const ChoppCallStatusScreen = () => {
  //   const [currentStep, setCurrentStep] = useState(2); // Example: currently on the "On The Way" step
  const { lastMessage } = useFilterWsMessages("callStatus");
  console.log("lastMessage ; ", lastMessage.message);
  const { theme } = useChoppTheme();

  const completedIndex = steps.findIndex((item) => item == lastMessage.message);
  console.log("completedIndex: ", completedIndex);
  const completedSteps = steps.slice(0, completedIndex + 1);

  console.log("completedSteps: ", completedSteps);

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
      {/* // <View style={styles.container}> */}
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
            title={step.title}
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
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-end",
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
});
