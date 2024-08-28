import { useTheme } from "@react-navigation/native";
import { ChopThemeType } from "./theme-type";
import { COLORS } from "@/constants/Colors";

export const useChoppTheme = () => {
  const { dark } = useTheme() as ChopThemeType;

  console.log('useChoppTheme: ', dark)

  return { dark, colors: dark ? COLORS.dark : COLORS.light };
};
