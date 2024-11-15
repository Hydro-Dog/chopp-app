import { View } from "react-native";
import { Stack } from "expo-router";
import { useAuthGuard } from "@/hooks";
import { useChoppTheme } from "@/shared";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/store/slices/user-slice";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";

export default function AppLayout() {
  const { theme } = useChoppTheme();

  useAuthGuard();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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
