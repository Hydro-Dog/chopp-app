import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";

type Props = {
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  icon?: ReactNode;
};

export const FormField = ({
  children,
  errorMessage,
  icon,
}: PropsWithChildren<Props>) => {
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Начальное значение прозрачности
  const moveAnim = useRef(new Animated.Value(0)).current; // Положение текста

  useEffect(() => {
    // Анимация появления и исчезновения ошибки
    Animated.timing(fadeAnim, {
      toValue: errorMessage ? 1 : 0, // Целевое значение прозрачности
      duration: 300, // Длительность анимации
      useNativeDriver: true, // Использование нативного драйвера для лучшей производительности
    }).start();
  }, [errorMessage]);

  useEffect(() => {
    if (textWidth > containerWidth) {
      // Запустить анимацию, если текст не помещается
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnim, {
            toValue: -(textWidth - containerWidth), // Сдвиг текста влево
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(moveAnim, {
            toValue: 0, // Возврат в исходное положение
            duration: 8000,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ).start();
    } else {
      moveAnim.setValue(0);
    }
  }, [textWidth, containerWidth]);

  return (
    <View
      style={styles.field}
      onLayout={({ nativeEvent }) =>
        setContainerWidth(nativeEvent.layout.width)
      }
    >
      <View style={{ width: "auto", height: "auto" }}>
        {children}
        {icon && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: 'flex-end'
            }}
          >
            <View style={{}}>{icon}</View>
          </View>
        )}
      </View>
      <Animated.View style={[styles.error, { opacity: fadeAnim }]}>
        <Animated.Text
          style={{ transform: [{ translateX: moveAnim }] }}
          numberOfLines={1}
        >
          {errorMessage && (
            <ThemedText
              variant="error"
              onLayout={({ nativeEvent }) =>
                setTextWidth(nativeEvent.layout.width)
              }
            >
              {String(errorMessage)}
            </ThemedText>
          )}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    overflow: "hidden",
  },
  error: {
    height: 24,
    width: 10000,
    // overflow: 'hidden',
  },
});
