import { View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useAuth, useChoppTheme } from "@/shared";

export default function AppLayout() {
  const { auth, isLoaded } = useAuth();
  const { theme } = useChoppTheme();
  console.log("AppLayout: ", isLoaded, auth?.accessToken);
  if (!auth?.accessToken && isLoaded) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  return (
    <View style={{ backgroundColor: theme.colors?.background, flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
