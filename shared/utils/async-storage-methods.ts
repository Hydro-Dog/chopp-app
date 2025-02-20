import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../enums/storage-keys";

export const addToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving data: ", String(error));
  }
};

export const getFromStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error("Error retrieving data: ", String(error));
  }
};

export const clearFieldStorage = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error retrieving data: ", String(error));
  }
};

export const removeAuthTokensFromStorage = async () => {
  try {
    await clearFieldStorage(STORAGE_KEYS.ACCESS_TOKEN);
    await clearFieldStorage(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error("Error retrieving data: ", String(error));
  }
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};

export const getStorageAuthData = async () => {
  const accessToken = await getFromStorage("accessToken");
  const refreshToken = await getFromStorage("refreshToken");

  return { accessToken: accessToken || "", refreshToken: refreshToken || "" };
};
