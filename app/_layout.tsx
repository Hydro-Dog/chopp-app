import React, { useEffect } from "react";
import { Platform, StatusBar, View } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useChoppTheme } from "@/shared";
import { ChoppGlobalProvider } from "@/shared/context/chopp-global-context";
import { store } from "@/store/store";
import { initI18n } from "@/translation/i18n";

initI18n();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const { theme } = useChoppTheme();
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
  // console.log("RootLayout theme.dark: ", theme.dark, theme.colors?.background);

  return (
    <StoreProvider store={store}>
      <ChoppGlobalProvider>
        <Slot />
        {/* TODO: Сделать, чтобы на светлой теме статус бар на айфоне не сливался с фоном*/}
        {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}

        {/* <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="registration" />
            <Stack.Screen name="login" />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="+html" />
          </Stack> */}
      </ChoppGlobalProvider>
    </StoreProvider>
  );
}
