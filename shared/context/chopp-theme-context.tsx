import {
  useState,
  useMemo,
  useEffect,
  PropsWithChildren,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { useColorScheme } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@react-navigation/native";
import { THEME } from "../enums/theme";
import { ChopThemeType } from "../types/chopp-theme-type";
import { addToStorage, getFromStorage } from "../utils";
import { DARK_THEME, LIGHT_THEME } from "@/theme/colors";

type ChoppThemeContextType = {
  theme: ChopThemeType;
  isDarkTheme: boolean;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
  toggleTheme: () => void;
};

const ChoppThemeContext = createContext<ChoppThemeContextType>({
  setIsDarkTheme: function (value: SetStateAction<boolean>): void {
    throw new Error("setIsDarkTheme Function not implemented.");
  },
  toggleTheme: function (): void {
    throw new Error("toggleTheme Function not implemented.");
  },
  theme: {
    dark: false,
    colors: LIGHT_THEME.colors,
  },
  isDarkTheme: false,
});

export const useChoppTheme = () => useContext(ChoppThemeContext);

export const ChoppThemeProvider = ({ children }: PropsWithChildren<object>) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const fetchTheme = async () => {
    const storageTheme = await getFromStorage("theme");
    setIsDarkTheme(storageTheme === "light" ? false : true);
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((val) => {
      const newTheme = !val;
      addToStorage("theme", newTheme === false ? "light" : "dark");
      return newTheme;
    });
  };
  const theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: isDarkTheme ? DARK_THEME.colors : LIGHT_THEME.colors,
      dark: isDarkTheme,
    }),
    [isDarkTheme],
  );

  const deviceColorScheme = useColorScheme();

  useEffect(() => {
    const getTheme = async () => {
      try {
        const storedTheme = (await AsyncStorage.getItem("theme")) as THEME;

        if (storedTheme === THEME.DEVICE) {
          const theme = deviceColorScheme;
          setIsDarkTheme(theme === THEME.DARK);
        } else {
          setIsDarkTheme(storedTheme === THEME.DARK);
        }
      } catch (error) {
        console.error("Ошибка при загрузке цветовой схемы:", error);
      }
    };

    getTheme();
  }, [deviceColorScheme]);

  return (
    <ChoppThemeContext.Provider value={{ setIsDarkTheme, isDarkTheme, theme, toggleTheme }}>
      {/* @ts-ignore */}
      <ThemeProvider value={{ ...theme }}>
        <PaperProvider theme={theme}>{children}</PaperProvider>
      </ThemeProvider>
    </ChoppThemeContext.Provider>
  );
};
