import { View } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ChoppThemedText } from "./chopp-themed-text";

type Props = {
  title: string;
  label?: string | number;
  containerStyle?: Record<string, any>;
  labelStyle?: Record<string, any>;
  loading?: boolean;
};

export const ChoppViewItem = ({
  title,
  label,
  labelStyle,
  containerStyle,
  loading
}: Props) => {
  return (
    <View style={containerStyle}>
      <ChoppThemedText type="subtitleBold" variant="secondary">
        {title}{" "}
      </ChoppThemedText>
      {loading ? (
        <ActivityIndicator style={[styles.label]} size="small" />
      ) : (
        <ChoppThemedText style={labelStyle}>{label}</ChoppThemedText>
      )}
    </View>
  );
};

// Стили для ActivityIndicator, чтобы он выглядел как текст
const styles = StyleSheet.create({
  label: {
    height: 20, // Высота примерно как у текста
    width: 20, // Ширина показывает, что "загружается текст"
  },
});
