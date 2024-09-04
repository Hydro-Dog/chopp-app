import AsyncStorage from "@react-native-async-storage/async-storage";

export const addToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving data: ", String(error));
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error("Error retrieving data: ", String(error));
  }
};
