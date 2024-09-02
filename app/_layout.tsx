import React, { useEffect } from "react";
import { View } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { ChoppGlobalProvider } from "@/shared/context/chopp-global-context";
import { store } from "@/store/store";
import { useChoppTheme } from "@/theme";
import { initI18n } from "@/translation/i18n";

initI18n();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useChoppTheme();
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
      <ChoppGlobalProvider>
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="registration" />
            <Stack.Screen name="login" />
            {/* <Stack.Screen name="dev" /> */}
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="+html" />
          </Stack>
        </View>
      </ChoppGlobalProvider>
    </StoreProvider>
  );
}
