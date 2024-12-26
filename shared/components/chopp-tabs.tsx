import { ScrollView, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useChoppTheme } from "../context";

const { Header } = Appbar;

type Props<T> = {
  value: string | number;
  onChange: (value: T) => void;
  options: T[];
};

export const ChoppTabs = <T extends { id: string | number; value: string }>({
  value,
  onChange,
  options,
}: Props<T>) => {
  const { theme } = useChoppTheme();

  return (
    <Header style={styles.header}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {options.map((item) => (
            <Chip
              key={item.id}
              style={[
                styles.chip,
                value === item.id && { backgroundColor: theme.colors.primary },
              ]}
              textStyle={value === item.id ? styles.activeText : undefined}
              onPress={() => onChange(item)}
            >
              {item.value}
            </Chip>
          ))}
        </View>
      </ScrollView>
    </Header>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4, // Используется, если поддерживается вашей версией React Native
  },
  chip: {
    margin: 4, // Альтернатива gap для более широкой совместимости
  },
  activeText: {
    color: "white", // Цвет текста для активного элемента
  },
  header: {
    backgroundColor: "transparent",
    paddingInline: 15,
  },
});
