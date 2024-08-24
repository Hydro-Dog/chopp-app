import React, { useEffect } from "react";
import { View } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { ChopThemeProvider } from "@/shared";
import { store } from "@/store/store";
import { ChopThemeType } from "@/theme/theme-type";
import { initI18n } from "@/translation/i18n";

initI18n();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useTheme() as ChopThemeType;
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
    Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
    "Nunito-bold": require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <ChopThemeProvider>
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="registration" />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="+html" />
          </Stack>
        </View>
      </ChopThemeProvider>
    </StoreProvider>
  );
}
