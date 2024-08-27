import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Snackbar } from "react-native-paper";
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

if (__DEV__) {
  console.log("Development mode");
} else {
  console.log("Production mode");
}

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

  const [visible, setVisible] = useState(true);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [snackbarMessages, setSnackbarMessages] = useState<
    Record<
      string,
      {
        id: string;
        variant: "info" | "error" | "warn" | "success" | "default";
        text: string;
        actionLabel: string;
        onPress?: () => void;
      }
    >
  >({});

  const [deletedSnackbars, setDeletedSnackbars] = useState(new Set());

  console.log("snackbarMessages: ", snackbarMessages);
  console.log("deletedSnackbars: ", deletedSnackbars);

  const pushSnackbar = (item) => {
    setSnackbarMessages((val) => ({ ...val, [item.id]: item }));
  };
  const popSnackbar = (itemId: string) => {
    console.log("itemId: ", itemId);
    setDeletedSnackbars(new Set([...deletedSnackbars, itemId]));

    setTimeout(() => {
      setSnackbarMessages((val) => {
        delete val[itemId];
        return val;
      });
    }, 1000);
  };

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
          <Button
            onPress={() => {
              pushSnackbar({
                id: String(Math.random()),
                variant: "default",
                text: "jopa",
                actionLabel: "hyi",
              });
            }}
          >
            {visible ? "Hide" : "Show"}
          </Button>
          {Object.values(snackbarMessages)?.map((item, index) => (
            <Snackbar
              key={index}
              style={{ backgroundColor: "red", top: (index + 1) * -20 }}
              visible={!deletedSnackbars.has(item.id)}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Undo",
                onPress: () => {
                  console.log("onPress: ", item.id);
                  popSnackbar(item.id);
                },
              }}
            >
              Hey there! I'm a Snackbar {item.id}.
            </Snackbar>
          ))}
        </View>
      </ChopThemeProvider>
    </StoreProvider>
  );
}
