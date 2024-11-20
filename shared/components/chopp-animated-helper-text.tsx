import { useRef, useEffect, PropsWithChildren } from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import { StyleSheet, Animated } from "react-native";
import { ChoppThemedText } from "./chopp-themed-text";


type Props = {
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export const ChoppAnimatedHelperText = ({
  errorMessage,
  message,
  children,
}: PropsWithChildren<Props>) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Начальное значение прозрачности
  const moveAnim = useRef(new Animated.Value(0)).current; // Положение текста

  useEffect(() => {
    // Анимация появления и исчезновения ошибки
    Animated.timing(fadeAnim, {
      toValue: errorMessage || message ? 1 : 0, // Целевое значение прозрачности
      duration: 300, // Длительность анимации
      useNativeDriver: true, // Использование нативного драйвера для лучшей производительности
    }).start();
  }, [errorMessage, message]);

  return (
    <Animated.View style={[styles.message, { opacity: fadeAnim }]}>
      <Animated.Text
        style={{ transform: [{ translateX: moveAnim }] }}
        numberOfLines={1}
      >
        <ChoppThemedText variant="error">
          {message && !errorMessage && (
            <ChoppThemedText style={styles.message}>
              {message && String(message)}
            </ChoppThemedText>
          )}
          {errorMessage && String(errorMessage)}
        </ChoppThemedText>
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  field: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    overflow: "hidden",
  },
  message: {
    height: 24,
    width: 10000,
  },
});
