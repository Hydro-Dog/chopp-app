import { View } from "react-native";
import { Stack } from "expo-router";
import { useChoppTheme } from "@/shared/context/chopp-theme-context";
import { useAuthGuard } from "@/hooks/use-auth-guard";

export default function AppLayout() {
  const { theme } = useChoppTheme();

  useAuthGuard();

  return (
    <View
      style={{
        backgroundColor: theme.colors?.background,
        flex: 1,
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
