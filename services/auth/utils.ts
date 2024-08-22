import * as SecureStore from "expo-secure-store";

export async function isUserAuthenticated() {
  await SecureStore.setItem("token", "token");
  const token = await SecureStore.getItemAsync("token");
  return !!token; // Возвращает true, если токен существует, иначе false
}
