
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Button, Switch } from "react-native-paper";
import { useChoppTheme } from "../context";

export const ChoppDevBar = () => {
  const { isDarkTheme, toggleTheme } = useChoppTheme();
  const showStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();

    const promises = keys.map(async (key) => {
      const val = await AsyncStorage.getItem(key);
      return [key, val];
    });

    const res = await Promise.all(promises); // Дождитесь завершения всех промисов

    console.log("Stored data:", JSON.stringify(res, null, 2));
  };

  const clearStorage = async () => {
    await AsyncStorage.clear();
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      <Button onPress={showStorage}>show</Button>
      <Button onPress={clearStorage}>x</Button>
    </View>
  );
};
