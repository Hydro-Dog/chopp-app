import { useState, useMemo, useEffect, PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { DefaultTheme, PaperProvider, Switch } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@react-navigation/native";
import { THEME } from "../enums";
import { DARK_THEME, LIGHT_THEME } from "@/theme";

export const ChopThemeProvider = ({ children }: PropsWithChildren<object>) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((val) => !val);
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
    <ThemeProvider value={theme}>
      <PaperProvider theme={theme} settings={{}}>
        {children}
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </PaperProvider>
    </ThemeProvider>
  );
};
