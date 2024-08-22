import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const useGetLocalStogrageTheme = () => {
  useEffect(() => {
    const getTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        // const loadedTheme = storedTheme ? (storedTheme as THEME) : THEME.LIGHT; // Преобразуем строку обратно в enum THEME, предполагая, что AsyncStorage возвращает только валидные значения.
        // setTheme(loadedTheme);
      } catch (error) {
        console.error("Ошибка при загрузке цветовой схемы:", error);
      }
    };

    getTheme();
  }, []);
};
