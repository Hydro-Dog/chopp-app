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
    return await AsyncStorage.getItem(key);
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
