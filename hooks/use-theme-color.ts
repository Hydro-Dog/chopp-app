/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { COLORS } from "@/constants/colors";
import { LIGHT_THEME, useChoppTheme } from "@/theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof LIGHT_THEME.colors,
) {
  const theme = useChoppTheme().dark ? "dark" : "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return COLORS[theme][colorName];
  }
}
